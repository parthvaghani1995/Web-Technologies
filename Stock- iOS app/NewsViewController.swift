//
//  NewsViewController.swift
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


class NewsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var errorMsgNews: UILabel!
    
    var strNewsData = ""
    var NewsArray:[(title:String,link:String,author:String,pubDate:String)] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        var b = ""
        var c = ""
        var d = ""
        
        print("get load news")
        print(strNewsData)
        
        Alamofire.request("http://pnodejs-env.us-west-2.elasticbeanstalk.com/NEWS/\(strNewsData)").responseSwiftyJSON{
            response in
            let json = response.result.value
            let isSuccess = response.result.isSuccess
            print(isSuccess)
            if (isSuccess && (json != nil)) {
                var a = json!["rss"]["channel"][0]["item"]
                for index in 0...a.count {
                    b = String(describing: a[index]["link"])
                    if(b.contains("article")){
                        c = String(describing: a[index]["pubDate"][0])
                        d = String(c.dropLast(5)) + "EST"
                        self.NewsArray.append((title: String(describing: a[index]["title"][0]), link: String(describing: a[index]["link"][0]), author: String(describing: a[index]["sa:author_name"][0]), pubDate: d ))
                    }
                }
            }
        }
        // Do any additional setup after loading the view.
        tableView.delegate = self
        tableView.dataSource = self
        
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        print("Appear")
        errorMsgNews.isHidden = true
        if !UserDefaults.standard.bool(forKey: "isDataLoad") {
            self.view.showToast("Failed to load data and display the chart!", position: .bottom, popTime: 2, dismissOnTap: false)
            errorMsgNews.isHidden = false
            tableView.isHidden = true
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return NewsArray.count
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 130
    }
   
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "customNewsCell") as! CustomNewsTableViewCell
        cell.titleLabel.text = NewsArray[indexPath.row].title
        cell.authorLabel.text = NewsArray[indexPath.row].author
        cell.dateLabel.text = NewsArray[indexPath.row].pubDate
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        UIApplication.shared.openURL(NSURL(string: NewsArray[indexPath.row].link)! as URL)
    }
    
    
}
