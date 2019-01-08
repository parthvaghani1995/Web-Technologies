//
//  HistoryViewController.swift
//  hw9
//
//  Created by Parth Vaghani on 16/11/17.
//  Copyright © 2017 Parth Vaghani. All rights reserved.
//

import UIKit
import WebKit

class HistoryViewController: UIViewController, WKScriptMessageHandler {
    
    @IBOutlet weak var otherView: UIView!
    @IBOutlet weak var errorMsg: UILabel!
    var webView: WKWebView?
    
    var strHistoricalData = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        let configuration=WKWebViewConfiguration()
        
        let controller=WKUserContentController()
        controller.add(self as WKScriptMessageHandler, name: "callbackHandler")
        configuration.userContentController=controller
        webView=WKWebView(frame: self.view.frame, configuration: configuration)
        webView?.scrollView.isScrollEnabled = false
        
        let url=Bundle.main.url(forResource: "highstock", withExtension: "html")
        let request=URLRequest(url: url!)
        otherView.addSubview(webView!)
        webView?.load(request)
        let timer = Timer.scheduledTimer(withTimeInterval: 4.0, repeats: false) { (timer) in
            self.webView?.evaluateJavaScript("createGraph(9,'\(self.strHistoricalData)')")
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        print("Appear")
        errorMsg.isHidden = true
        if !UserDefaults.standard.bool(forKey: "isDataLoad") {
            self.view.showToast("Failed to load data and display the chart!", position: .bottom, popTime: 2, dismissOnTap: false)
            errorMsg.isHidden = false
            otherView.isHidden = true
        }
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        var a = String(describing: message.body)
        if(message.name == "callbackHandler"){
            print("callbackHandler: \(message.body)")
            if(a == "Error"){
                print("Error")
            }
        }
    }
    
    func changeDisplayContent(){
        print("Error")
    }
}
