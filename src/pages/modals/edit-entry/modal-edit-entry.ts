import { Component } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { Entry } from "../../../app/classes/entry";
import { Category } from "../../../app/classes/category";

@Component({
  selector: 'modal-edit-entry',
  templateUrl: 'modal-edit-entry.html'
})
export class EditEntry {

  entry: Entry;
  categories: Category[];

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.categories = params.get("categories");
    this.entry = params.get("entry");
  }

  dismiss(validateForm?: boolean) {
    if (validateForm) {
      this.viewCtrl.dismiss(this.entry);
    } else {
      this.viewCtrl.dismiss();
    }
  }

}
