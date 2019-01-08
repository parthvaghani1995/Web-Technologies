//
//  customFavTableViewCell.swift
//  hw9
//
//  Created by Parth Vaghani on 20/11/17.
//  Copyright © 2017 Parth Vaghani. All rights reserved.
//

import UIKit

class customFavTableViewCell: UITableViewCell {

    @IBOutlet weak var cellView: UIView!
    @IBOutlet weak var symbolLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!
    @IBOutlet weak var changeLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
