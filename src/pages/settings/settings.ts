import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesPage } from "./categories/categories";

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }

  openPageCategorie() {
    this.navCtrl.push(CategoriesPage);
  }

}
