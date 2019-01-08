//
//  StockDeatilsViewController.swift
//  hw9
//
//  Created by Parth Vaghani on 16/11/17.
//  Copyright © 2017 Parth Vaghani. All rights reserved.
//

import UIKit
import Alamofire
import AlamofireSwiftyJSON
import SwiftSpinner

class StockDeatilsViewController: UIViewController {
    
    @IBOutlet weak var viewContainer: UIView!
    @IBOutlet weak var segmentedControl: UISegmentedControl!
    
    var stockSymbol : String = ""
    let strCurrentData = "Current Data"
    let strHistoricalData = "Historical Data"
    let strNewsData = "News Data"
    
    private lazy var currentViewController: CurrentViewController = {
        let storyboard = UIStoryboard(name: "Main", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "CurrentViewController") as! CurrentViewController
        viewController.strCurrentData = self.stockSymbol
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    private lazy var historyViewController: HistoryViewController = {
        let storyboard = UIStoryboard(name: "Main", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "HistoryViewController") as! HistoryViewController
        viewController.strHistoricalData = self.stockSymbol
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    private lazy var newsViewController: NewsViewController = {
        let storyboard = UIStoryboard(name: "Main", bundle: Bundle.main)
        var viewController = storyboard.instantiateViewController(withIdentifier: "NewsViewController") as! NewsViewController
        viewController.strNewsData = self.stockSymbol
        self.add(asChildViewController: viewController)
        return viewController
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
        self.navigationItem.title = stockSymbol
        remove(asChildViewController: historyViewController)
        remove(asChildViewController: newsViewController)
        add(asChildViewController: currentViewController)
        
        
        // Do any additional setup after loading the view.

        //SwiftSpinner.show("Connecting to satellite...")
        
        
        //print(stockSymbol)
    }

    @IBAction func seg_StockChanged(_ sender: UISegmentedControl) {
        
        if sender.selectedSegmentIndex == 0 {
            //print("Current")
            remove(asChildViewController: historyViewController)
            remove(asChildViewController: newsViewController)
            add(asChildViewController: currentViewController)
        }
        
        if sender.selectedSegmentIndex == 1 {
            //print("Historical")
            remove(asChildViewController: newsViewController)
            remove(asChildViewController: currentViewController)
            add(asChildViewController: historyViewController)
        }
        
        if sender.selectedSegmentIndex == 2 {
            //print("News")
            remove(asChildViewController: historyViewController)
            remove(asChildViewController: currentViewController)
            add(asChildViewController: newsViewController)
        }
    }
    
    private func add(asChildViewController viewController: UIViewController) {
        addChildViewController(viewController)
        viewContainer.addSubview(viewController.view)
        viewController.view.frame = viewContainer.bounds
        viewController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        viewController.didMove(toParentViewController: self)
    }
    
    private func remove(asChildViewController viewController: UIViewController) {
        viewController.willMove(toParentViewController: nil)
        viewController.view.removeFromSuperview()
        viewController.removeFromParentViewController()
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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
