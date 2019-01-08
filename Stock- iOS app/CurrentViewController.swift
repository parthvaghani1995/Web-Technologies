//
//  CurrentViewController.swift
//  hw9
//
//  Created by Parth Vaghani on 16/11/17.
//  Copyright © 2017 Parth Vaghani. All rights reserved.
//

import UIKit
import Alamofire
import AlamofireSwiftyJSON
import SwiftSpinner
import SwiftyJSON
import Foundation
import WebKit

class CurrentViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UIPickerViewDataSource, UIPickerViewDelegate, WKScriptMessageHandler, FBSDKSharingDelegate {
    func sharer(_ sharer: FBSDKSharing!, didCompleteWithResults results: [AnyHashable : Any]!) {
        self.view.showToast("Posted Successfully!", position: .bottom, popTime: 5, dismissOnTap: false)
        print(results)
    }
    
    func sharer(_ sharer: FBSDKSharing!, didFailWithError error: Error!) {
        self.view.showToast("Failed", position: .bottom, popTime: 5, dismissOnTap: false)
        print(error)
    }
    
    func sharerDidCancel(_ sharer: FBSDKSharing!) {
        self.view.showToast("Cancelled", position: .bottom, popTime: 5, dismissOnTap: false)
        
        print("A")
    }
    
    
    @IBOutlet weak var favouritesBtnImage: UIButton!
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var pickerView: UIPickerView!
    @IBOutlet weak var changeBtn: UIButton!
    @IBOutlet weak var otherView: UIView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    var strCurrentData = ""
    var pressed = false
    var facebookPNGLink = ""
    
    let listOfIndicators : [String] = ["Price", "SMA", "EMA", "STOCH", "RSI", "ADX", "CCI", "BBANDS", "MACD"]
    let a = ["Stock Symbol","Last Price","Change","Timestamp","Open","Close","Day's Range","Volume"]
    var b = ["","","","","","","",""]
    var c = ["","","","","","","",""]
    
    var previousSelected = "Price"
    var currentSelected = "Price"
    var selectedGraph = "Price"
    var webView: WKWebView?
    var savedSymbol = ""
    var savedSymbolArray : [String] = []
    

    override func viewDidLoad() {
        super.viewDidLoad()
        changeBtn.isEnabled = false
        checkFavourite()
        
        tableView.delegate = self
        tableView.dataSource = self
        
        SwiftSpinner.show("Loading Data")
        // Do any additional setup after loading the view.
        Alamofire.request("http://pnodejs-env.us-west-2.elasticbeanstalk.com/priceVolume/\(strCurrentData)").responseSwiftyJSON {
            response in
            let json = response.result.value // JSON object
            let isSuccess = response.result.isSuccess
            if (isSuccess && (json != nil)){
                
                let dict: [String: AnyObject]
                if let jDict = json?.dictionaryObject {
                    dict = jDict as [String : AnyObject]
                } else {
                    dict = [String: AnyObject]()
                }
                
                if (dict["Meta Data"] != nil) {
                    let jsonObj = json!["Meta Data"] //JSON
                    
                    var lastRefreshedDate = String(describing: json!["Meta Data"]["3. Last Refreshed"]).prefix(10)
                    var dataTimeSeries = json!["Time Series (Daily)"]
                    
                    let sorted = dataTimeSeries.sorted {$0.0 > $1.0}
                    var i=0;
                    var previousDayDate = ""
                    var imgsrc = ""
                    
                    for element in sorted {
                        i = i+1
                        if(i == 2){
                            previousDayDate = String(element.0)
                            break
                        }
                    }
                    
                    let currentClose = dataTimeSeries[String(lastRefreshedDate)]["4. close"].floatValue
                    let previousClose = dataTimeSeries[String(previousDayDate)]["4. close"].floatValue
                    
                    let tempchangeClose = currentClose - previousClose
                    let changeClose = String(format: "%.2f", tempchangeClose)
                    
                    let tempchangePercentage = Double((tempchangeClose / currentClose) * 100)
                    let changePercentage = String(format: "%.2f", tempchangePercentage)
                    
                    let tempOpen = (dataTimeSeries[String(lastRefreshedDate)]["1. open"]).string!
                    let Open = String(format: "%.2f", tempOpen)
                    
                    let tempDayRangeLow = (dataTimeSeries[String(lastRefreshedDate)]["3. low"]).string!.prefix(6)
                    let DayRangeLow = String(format: "%.2f", tempDayRangeLow as CVarArg)
                    
                    let tempDayRangeHigh = (dataTimeSeries[String(lastRefreshedDate)]["2. high"]).string!.prefix(6)
                    let DayRangeHigh = String(format: "%.2f", tempDayRangeHigh as CVarArg)
                    print(dataTimeSeries[String(lastRefreshedDate)]["5. volume"])
                    let largeNumber = (dataTimeSeries[String(lastRefreshedDate)]["5. volume"]).numberValue
                    let numberFormatter = NumberFormatter()
                    numberFormatter.numberStyle = NumberFormatter.Style.decimal
                    let volume = numberFormatter.string(from: largeNumber)!
                    
                    
                    if(tempchangeClose > 0){
                        imgsrc = "Green_Arrow_Up"
                    } else {
                        imgsrc = "Red_Arrow_Down"
                    }
                    var lastRefreshedDateTest = String(describing: json!["Meta Data"]["3. Last Refreshed"])
                    print("count - \(lastRefreshedDateTest.count) - \(lastRefreshedDateTest)")
                    if lastRefreshedDateTest.count <= 10 {
                        let dateFormatterGet = DateFormatter()
                        dateFormatterGet.dateFormat = "yyyy-MM-dd"
                        
                        let dateFormatter = DateFormatter()
                        dateFormatter.timeZone = TimeZone(abbreviation: "EDT")
                        dateFormatter.dateFormat = "yyyy-MM-dd 16:00:00 zzz"
                        
                        let date: Date? = dateFormatterGet.date(from: lastRefreshedDateTest)
                        print(dateFormatter.string(from: date!))
                        self.b[3] = "\(dateFormatter.string(from: date!))"
                        self.b[5] = String(currentClose)
                    }
                    else
                    {
                        let dateFormatterGet = DateFormatter()
                        
                        dateFormatterGet.dateFormat = "yyyy-MM-dd HH:mm:ss"
                        
                        let dateFormatter = DateFormatter()
                        dateFormatter.timeZone = TimeZone(abbreviation: "EST")
                        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss zzz"
                        
                        print(lastRefreshedDateTest)
                        let date: Date? = dateFormatterGet.date(from: lastRefreshedDateTest)
                        self.b[3] = "\(dateFormatter.string(from: date!))"
                        self.b[5] = String(previousClose)
                    }
                    
                    self.b[0] = String(describing: jsonObj["2. Symbol"])
                    self.b[1] = String(currentClose)
                    self.b[2] = "\(changeClose) (\(changePercentage))%"
                    self.b[4] = String(tempOpen)
                    self.b[6] = "\(tempDayRangeLow) - \(tempDayRangeHigh)"
                    self.b[7] = String(describing: volume)
                    self.c[2] = imgsrc
                    
                    self.tableView.reloadData()
                    SwiftSpinner.hide()
                    self.savedSymbol = self.b[0]
                }
                else
                {
                    SwiftSpinner.hide()
                    UserDefaults.standard.set(false, forKey: "isDataLoad")
                    self.view.showToast("Failed to load data and display the chart!", position: .bottom, popTime: 2, dismissOnTap: false)
                    let timer1 = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { (timer) in
                        let storyboard = UIStoryboard(name: "Main", bundle: Bundle.main)
                        var viewController = storyboard.instantiateViewController(withIdentifier: "HistoryViewController") as! HistoryViewController
                        viewController.changeDisplayContent()
                    }
                }
            }
            else
            {
                SwiftSpinner.hide()
                self.view.showToast("Cannot Load Data", position: .bottom, popTime: 5, dismissOnTap: false)
            }
        }
        
        let configuration=WKWebViewConfiguration()
        
        let controller=WKUserContentController()
        controller.add(self, name: "callbackHandler")
        configuration.userContentController=controller
        webView=WKWebView(frame: self.view.frame, configuration: configuration)
        
        
        let url=Bundle.main.url(forResource: "stockGraph", withExtension: "html")
        let request=URLRequest(url: url!)
        otherView.addSubview(webView!)
        
        webView?.load(request)
        let timer1 = Timer.scheduledTimer(withTimeInterval: 3.0, repeats: false) { (timer) in
            self.webView?.evaluateJavaScript("createGraph(0,'\(self.strCurrentData)')")
        }
    }

    @IBAction func pressedFavouritesBtn(_ sender: UIButton) {
        if(pressed){
            let image = UIImage(named: "empty") as UIImage!
            favouritesBtnImage.setImage(image, for: .normal)
            if let temp = UserDefaults.standard.array(forKey: "savedSymbol"){
                savedSymbolArray = UserDefaults.standard.array(forKey: "savedSymbol") as! [String]
                if let index = savedSymbolArray.index(of: savedSymbol){
                    savedSymbolArray.remove(at: index)
                    print(index)
                }
                UserDefaults.standard.set(savedSymbolArray, forKey: "savedSymbol")
            }
            pressed = false
            for (key, value) in UserDefaults.standard.dictionaryRepresentation() {
                print("\(key) = \(value) \n")
            }
        }else{
            let image = UIImage(named: "filled") as UIImage!
            favouritesBtnImage.setImage(image, for: .normal)
            if let temp = UserDefaults.standard.array(forKey: "savedSymbol"){
                savedSymbolArray = UserDefaults.standard.array(forKey: "savedSymbol") as! [String]
                savedSymbolArray.append(savedSymbol)
            }else{
                savedSymbolArray.append(savedSymbol)
            }
            print(savedSymbolArray)
            UserDefaults.standard.set(savedSymbolArray, forKey: "savedSymbol")
            pressed = true
            //self.favouritesBtnImage.setImage(UIImage(named: "star-filled-50-2"), for: .normal)
        }
        
        
    }
 
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return a.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "customCell") as! CustomTableViewCell
        cell.titleLabel.text = a[indexPath.row]
        cell.valueLabel.text = b[indexPath.row]
        if(indexPath.row == 2){
            cell.imageViewLabel.image = UIImage(named: c[indexPath.row])
        }
        
        return cell
        
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return listOfIndicators.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return listOfIndicators[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if(listOfIndicators[row] == currentSelected){
            changeBtn.isEnabled = false
        }else{
            changeBtn.isEnabled = true
        }
        if(listOfIndicators[row] == "Price"){
            selectedGraph = "createGraph(0,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "SMA"){
            selectedGraph = "createGraph(1,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "EMA"){
            selectedGraph = "createGraph(2,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "STOCH"){
            selectedGraph = "createGraph(3,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "RSI"){
            selectedGraph = "createGraph(4,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "ADX"){
            selectedGraph = "createGraph(5,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "CCI"){
            selectedGraph = "createGraph(6,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "BBANDS"){
            selectedGraph = "createGraph(7,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
        if(listOfIndicators[row] == "MACD"){
            selectedGraph = "createGraph(8,'\(strCurrentData)')"
            previousSelected = listOfIndicators[row]
        }
    }
    
    
    @IBAction func changeBtnPressed(_ sender: Any) {
        webView?.evaluateJavaScript(selectedGraph)
        print(selectedGraph)
        changeBtn.isEnabled = false
        currentSelected = previousSelected
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        if(message.name == "callbackHandler"){
            print("callbackHandler: \(message.body)")
            var a = String(describing: message.body)
            if(a == "Start"){
                activityIndicator.isHidden = false
                activityIndicator.startAnimating()
            }
            if(a == "End"){
                activityIndicator.isHidden = true
                activityIndicator.stopAnimating()
            }
            else{
                facebookPNGLink = String(describing: message.body)
                print(facebookPNGLink)
            }
        }
    }
    
    func checkFavourite (){
        if let temp = UserDefaults.standard.array(forKey: "savedSymbol"){

            for index in 0..<temp.count{
                if(String(describing: temp[index]) == strCurrentData){
                    let image = UIImage(named: "filled") as UIImage!
                    favouritesBtnImage.setImage(image, for: .normal)
                    pressed = true
                }
                
            }
        }
    }
    
    @IBAction func shareFacebook(_ sender: Any) {
        self.webView?.evaluateJavaScript("facebookshare()")
        let timer1 = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { (timer) in
            let content: FBSDKShareLinkContent = FBSDKShareLinkContent()
            content.contentURL = URL(string: "\(self.facebookPNGLink)")
            FBSDKShareDialog.show(from: self.parent, with: content, delegate: self)
        }
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
