//  latest - 27
//  ViewController.swift
//  hw9
//
//  Created by Parth Vaghani on 16/11/17.
//  Copyright © 2017 Parth Vaghani. All rights reserved.
//

import UIKit
import SearchTextField
import EasyToast
import Alamofire
import AlamofireSwiftyJSON

class ViewController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate, UITextFieldDelegate, UITableViewDelegate, UITableViewDataSource  {
    
    @IBOutlet weak var mySearchTextField: SearchTextField!
    @IBOutlet weak var sortByPV: UIPickerView!
    @IBOutlet weak var orderByPV: UIPickerView!
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    var favArray:[(symbol:String,price:Double,change:String,changePercent:String,color:String)] = []
    
    let sortByItems : [String] = ["Default", "Symbol", "Price", "Change", "Change(%)"]
    let orderByItems : [String] = ["Ascending", "Descending"]
    
    var arrStockData : NSMutableArray = NSMutableArray()
    var stockSymbolName : String = ""
    var savedSymbolArray : [String] = []
    var sortingOrder = "Ascending"
    var sortBy = "Symbol"
    var autoRefreshTimer : Timer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        sortByPV.delegate = self
        orderByPV.delegate = self
        
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.navigationController?.isNavigationBarHidden = true
        self.loadFavouritesTable()
        
    }
    
    @IBAction func checkSymbol(_ sender: Any) {
        self.view.endEditing(true)
        UserDefaults.standard.set(true, forKey: "isDataLoad")
        if (mySearchTextField.text?.trimmingCharacters(in: .whitespaces).isEmpty)! {
            self.view.showToast("Enter Text", position: .bottom, popTime: 5, dismissOnTap: false)
        }else {
            let stockDetail_VC = self.storyboard?.instantiateViewController(withIdentifier: "StockDeatilsViewController") as! StockDeatilsViewController
            stockSymbolName = (mySearchTextField.text?.trimmingCharacters(in: .whitespaces))!
            let index = stockSymbolName.index(of: "-") ?? stockSymbolName.endIndex
            var beginning  = stockSymbolName[..<index]
            print(beginning)
            mySearchTextField.resignFirstResponder()
            stockDetail_VC.stockSymbol  = String(beginning).trimmingCharacters(in: .whitespaces)
            self.navigationController?.pushViewController(stockDetail_VC, animated: true)
        }
    }
    
    @IBAction func clearButtonPressed(_ sender: Any) {
        mySearchTextField.text = ""
    }
    
// Picker View
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        if pickerView == sortByPV {
            return sortByItems.count
        }else if pickerView == orderByPV {
            return orderByItems.count
        }
        return 0
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        if pickerView == sortByPV {
            return sortByItems[row]
        }else if pickerView == orderByPV {
            return orderByItems[row]
        }
        return nil
    }
    
    func pickerView(_ pickerView: UIPickerView, viewForRow row: Int, forComponent component: Int, reusing view: UIView?) -> UIView {
        var label = UILabel()
        if let v = view {
            label = v as! UILabel
        }
        label.font = UIFont (name: "Helvetica Neue", size: 17)
        if pickerView == sortByPV {
            label.text =  sortByItems[row]
        }else if pickerView == orderByPV {
            label.text =  orderByItems[row]
        }
        
        label.textAlignment = .center
        return label
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if pickerView == sortByPV {
            if (sortByItems[row] == "Default"){
                orderByPV.isUserInteractionEnabled = false
            }else{
                orderByPV.isUserInteractionEnabled = true
            }
            sortBy = sortByItems[row]
        }
        if pickerView == orderByPV {
            sortingOrder = orderByItems[row]
        }
        if(sortBy == "Price" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.1 < $1.1 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Price" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.1 > $1.1 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Symbol" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.0 < $1.0 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Symbol" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.0 > $1.0 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.2 < $1.2 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.2 > $1.2 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change(%)" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.3 < $1.3 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change(%)" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.3 > $1.3 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        print("\(sortBy) - \(sortingOrder)")
    }
    
    // Picker View End
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        print("Begin")
        
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let finalString = "\(textField.text!)\(string)"
        self.getStockNames(strText: finalString)
        return true
    }
    
    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return true
    }
    
    func getStockNames(strText : String) {
        Alamofire.request("http://pnodejs-env.us-west-2.elasticbeanstalk.com/autocomplete?alphabet=\(strText)").responseJSON { response in
            
            //print("Request: \(String(describing: response.request))")   // original url request
                        //print("Response: \(String(describing: response.response))") // http url response
                        //print("Result: \(response.result)")                         // response serialization result
            
            if let json = response.result.value {
                self.arrStockData = NSMutableArray(array: json as! NSArray)
                let arrSymbol = NSMutableArray(array: self.arrStockData.value(forKeyPath: "Symbol") as! NSArray)
                let arrName = NSMutableArray(array: self.arrStockData.value(forKeyPath: "Name") as! NSArray)
                let arrExchange = NSMutableArray(array: self.arrStockData.value(forKeyPath: "Exchange") as! NSArray)
                
                let arrFinalData : NSMutableArray = NSMutableArray()
                for i in 0..<arrSymbol.count {
                    let strFinalName = "\(arrSymbol.object(at: i)) - \(arrName.object(at: i)) (\(arrExchange.object(at: i)))"
                    arrFinalData.add(strFinalName)
                }
                self.mySearchTextField.maxNumberOfResults = 5
                self.mySearchTextField.filterStrings(arrFinalData as! [String])
                //                print("JSON: \(json)") // serialized json response
            }
            
            if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
                //                print("Data: \(utf8Text)") // original server data as UTF8 string
            }
        }
    }
    
    @objc func loadFavouritesTable() {
        self.favArray.removeAll()
        if let temp = UserDefaults.standard.array(forKey: "savedSymbol"){
            savedSymbolArray = UserDefaults.standard.array(forKey: "savedSymbol") as! [String]
            if savedSymbolArray.count > 0 {
                activityIndicator.startAnimating()
            }
            loadTable()
        }
    }
    
    func loadTable() {
        for index in 0..<savedSymbolArray.count {
            print(savedSymbolArray[index])
            
            Alamofire.request("http://pnodejs-env.us-west-2.elasticbeanstalk.com/priceVolume/\(savedSymbolArray[index])").responseSwiftyJSON {
                response in
                let json = response.result.value // JSON object
                let isSuccess = response.result.isSuccess
                if (isSuccess && (json != nil)) {
                    let jsonObj = json!["Meta Data"] //JSON
                    
                    let lastRefreshedDate = String(describing: json!["Meta Data"]["3. Last Refreshed"]).prefix(10)
                    var dataTimeSeries = json!["Time Series (Daily)"]
                    
                    let dict: [String: AnyObject]
                    if let jDict = json!["Time Series (Daily)"].dictionaryObject {
                        dict = jDict as [String : AnyObject]
                    } else {
                        dict = [String: AnyObject]()
                    }
                    
                    let sorted = dataTimeSeries.sorted {$0.0 > $1.0}
                    var i=0;
                    var previousDayDate = ""
                    var imgsrc = ""
                    
                    //print(sorted)
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
                    
                    //print(dataTimeSeries)
                    
                    if (dict["\(lastRefreshedDate)"] != nil) {
                        
//                        let tempOpen = (dataTimeSeries[String(lastRefreshedDate)]["1. open"]).string!
//                        let Open = String(format: "%.2f", tempOpen)
//
//                        let tempDayRangeLow = (dataTimeSeries[String(lastRefreshedDate)]["3. low"]).string!.prefix(6)
//                        let DayRangeLow = String(format: "%.2f", tempDayRangeLow as CVarArg)
//
//                        let tempDayRangeHigh = (dataTimeSeries[String(lastRefreshedDate)]["2. high"]).string!.prefix(6)
//                        let DayRangeHigh = String(format: "%.2f", tempDayRangeHigh as CVarArg)
//
//                        let largeNumber = (dataTimeSeries[String(lastRefreshedDate)]["5. volume"]).numberValue
//                        let numberFormatter = NumberFormatter()
//                        numberFormatter.numberStyle = NumberFormatter.Style.decimal
//                        let volume = numberFormatter.string(from: largeNumber)!
                        
                        if(tempchangeClose > 0){
                            imgsrc = "green"
                        } else {
                            imgsrc = "red"
                        }
                        
                        self.favArray.append((symbol: self.savedSymbolArray[index], price: Double(currentClose), change: changeClose, changePercent: changePercentage, color: imgsrc))
                        print(self.favArray)
                        
                        if self.favArray.count == self.savedSymbolArray.count {
                            self.tableView.reloadData()
                            self.activityIndicator.stopAnimating()
                        }
                    }
                }
                else
                {
                    self.activityIndicator.stopAnimating()
                    self.view.showToast("Cannot Load Data", position: .bottom, popTime: 5, dismissOnTap: false)
                }
            }
        }
        self.sortAndReload()
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        print("in cont")
        return favArray.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        //print(favArray)
        let cell = tableView.dequeueReusableCell(withIdentifier: "customFavCell") as! customFavTableViewCell
        cell.symbolLabel.text = favArray[indexPath.row].symbol
        cell.priceLabel.text = String(format : "%.2f",favArray[indexPath.row].price)
        cell.changeLabel.text = "\(favArray[indexPath.row].change) (\(favArray[indexPath.row].changePercent)%)"
        if(favArray[indexPath.row].color == "red"){
            cell.changeLabel.textColor = UIColor.red
        }
        if(favArray[indexPath.row].color == "green"){
            cell.changeLabel.textColor = UIColor.green
        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == UITableViewCellEditingStyle.delete{
            savedSymbolArray = UserDefaults.standard.array(forKey: "savedSymbol") as! [String]
            if let index = savedSymbolArray.index(of: favArray[indexPath.row].symbol){
                savedSymbolArray.remove(at: index)
                favArray.remove(at: indexPath.row)
                print(savedSymbolArray)
            }
            UserDefaults.standard.set(savedSymbolArray, forKey: "savedSymbol")
            self.tableView.reloadData()
//            loadFavouritesTable()
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let stockDetail_VC = self.storyboard?.instantiateViewController(withIdentifier: "StockDeatilsViewController") as! StockDeatilsViewController
        stockDetail_VC.stockSymbol  = favArray[indexPath.row].symbol
        self.navigationController?.pushViewController(stockDetail_VC, animated: true)
    }
    
    func sortAndReload() {
        if(sortBy == "Price" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.1 < $1.1 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Price" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.1 > $1.1 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Symbol" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.0 < $1.0 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Symbol" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.0 > $1.0 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.2 < $1.2 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.2 > $1.2 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change(%)" && sortingOrder == "Ascending"){
            let a = favArray.sorted { $0.3 < $1.3 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        if(sortBy == "Change(%)" && sortingOrder == "Descending"){
            let a = favArray.sorted { $0.3 > $1.3 }
            favArray = a
            self.tableView.reloadData()
            print(a)
        }
        print("\(sortBy) - \(sortingOrder)")
    }
    
    
    @IBAction func refreshBtn(_ sender: Any) {
        loadFavouritesTable()
    }
    @IBAction func autoRefreshToggleBtn(_ sender: UISwitch) {
        if(sender.isOn){
            autoRefreshTimer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(loadFavouritesTable), userInfo: nil, repeats: true)
            print("ON")
        }else{
            autoRefreshTimer.invalidate()
            print("OFF")
        }
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

