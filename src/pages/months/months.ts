import { Component } from "@angular/core";
import { ModalController, AlertController } from 'ionic-angular';

import { StorageService } from "../../app/services/storage.service";
import { CategoryService } from "../../app/services/categories.service";
import { AddEntry } from "../modals/add-entry/modal-add-entry";
import { EditEntry } from "../modals/edit-entry/modal-edit-entry";

import { Entry } from "../../app/classes/entry";
import { Category } from "../../app/classes/category";
import { Balance } from "../../app/classes/balance";
import { MonthsConstant } from "../../app/constants/months.constants";

@Component({
  selector: 'month-page',
  templateUrl: 'months.html'
})
export class MonthPage {
  // Variables
  displayDate: Date;
  displayDateString: String;
  balance: Balance;
  entries: Entry[];
  categories: Category[];

  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, public storageService: StorageService, public categoryService: CategoryService) {
    this.displayDate = new Date(); //nouvelle date pour ne pas toucher a la courante
    this.balance = new Balance();
    this.categories = categoryService.getAllCategories();
    this.updateMonth();
  }

  /**
   * @desc Change la date affichee au mois precedent, tiens en compte de l'annee.
   */
  previousMonth() {
    var previousMonthNb: number;
    if (this.displayDate.getMonth() > 0) {
      previousMonthNb = this.displayDate.getMonth() - 1;
    } else {
      previousMonthNb = 11;
      this.displayDate.setFullYear(this.displayDate.getFullYear() - 1);
    }
    this.displayDate.setMonth(previousMonthNb);
    this.updateMonth();
  }

  /**
   * @desc Change la date affichee au mois suivant, tiens en compte de l'annee.
   */
  nextMonth() {
    var nextMonthNb: number;
    if (this.displayDate.getMonth() < 11) {
      nextMonthNb = this.displayDate.getMonth() + 1;
    } else {
      nextMonthNb = 0;
      this.displayDate.setFullYear(this.displayDate.getFullYear() + 1);
    }
    this.displayDate.setMonth(nextMonthNb);
    this.updateMonth();
  }

  /**
   * @desc Ouvre la modale permettant d'ajouter une entree.
   */
  addEntry() {
    const modal = this.modalCtrl.create(AddEntry, { categories: this.categories });
    modal.onDidDismiss(entry => {
      if (entry) {
        this.storageService.setEntry(entry)
          .then(() => this.updateMonth())
      }
    });
    modal.present();
  }

  /**
   * Ouvre le dialogue de confirmation de suppression
   * @param {number} id
   */
  delEntry(id: number) {
    let confirm = this.alertCtrl.create({
      title: "Confirmer suppression",
      message: "Etes-vous surs de vouloir supprimer cette entree ?",
      buttons: [
        { text: 'Non' },
        {
          text: 'Oui',
          handler: () => {
            this.storageService.delEntry(id)
              .then(() => this.updateMonth())
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * @desc Ouvre la modale d'edition
   * @param {Entry} entryToEdit - Entree a modifier
   */
  editEntry(entryToEdit: Entry) {
    const modal = this.modalCtrl.create(EditEntry, { categories: this.categories, entry: entryToEdit });
    modal.onDidDismiss(entry => {
      if (entry) {
        this.storageService.updateEntry(entry)
          .then(() => this.updateMonth())
      }
    });
    modal.present();
  }

  /**
   * @desc Remet a jour le widget, en changeant la date affichee, les entrees correspondantes et recalcule la balance.
   */
  updateMonth() {
    this.displayDateString = MonthsConstant[this.displayDate.getMonth()] + " " + this.displayDate.getFullYear();
    //this.storageService.getAllEntries(this.displayDate);
    this.storageService.getAllEntries(this.displayDate).then(entries => {
      this.entries = entries.sort(this.sortEntries);
      this.updateBalance();
    });
  }

  /**
   * @desc Remet a la date du jour.
   */
  resetMonth() {
    this.displayDate = new Date();
    this.updateMonth();
  }

  /**
   * @desc Met a jour la balance monetaire du mois.
   */
  updateBalance() {
    this.balance.income = 0;
    this.balance.outcome = 0;
    for (var i = 0, l = this.entries.length; i < l; i++) {
      if (this.entries[i].income) {
        this.balance.income = this.entries[i].value + this.balance.income;
      } else {
        this.balance.outcome = this.entries[i].value + this.balance.outcome;
      }
    }
    this.balance.income = Math.round(this.balance.income);
    this.balance.outcome = Math.round(this.balance.outcome);
    this.balance.remainder = this.balance.income - this.balance.outcome;
  }

  /**
   * @desc Comparaison des entrees.
   * @param a - 1ere entree
   * @param b - 2e entree
   * @returns 0 si date egale, 1 si a.date < b.date, -1 sinon.
   */
  sortEntries(a: Entry, b: Entry): number {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    }
    return 0;
  }

  /**
   * @desc Compare la date d'une entree a la date de l'entree anterieure.
   * @param i - Index de l'entree a comparer
   * @returns True si les dates sont les memes, False sinon.
   */
  samePreviousDate(i: number): boolean {
    if (i > 0) {
      return this.entries[i - 1].date.getDate() === this.entries[i].date.getDate();
    }
    return false;
  }
}

