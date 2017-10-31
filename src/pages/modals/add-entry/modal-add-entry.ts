import { Component } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { Entry } from "../../../app/classes/entry";
import { Category } from "../../../app/classes/category";

@Component({
  selector: 'modal-add-entry',
  templateUrl: 'modal-add-entry.html'
})
export class AddEntry {

  newEntry: Entry;
  date: string;
  categories: Category[];

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.categories = params.get("categories");
    this.date = (new Date()).toISOString();
    this.newEntry = new Entry();
    this.newEntry.income = false;
  }

  dismiss(validateForm?: boolean) {
    if (validateForm) {
      this.newEntry.date = new Date(this.date);
      this.viewCtrl.dismiss(this.newEntry);
    } else {
      this.viewCtrl.dismiss();
    }
  }

}
