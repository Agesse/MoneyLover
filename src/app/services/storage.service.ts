import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';

import { Entry } from "../classes/entry";

@Injectable()
export class StorageService {

  constructor(public storage: Storage, public toastCtrl: ToastController) {
  }

  /**
   * @desc GET : id => entry
   * @param {number} id
   * @returns {Promise<Entry>}
   */
  /*getEntry(id: number): Promise<Entry> {
    return this.storage.get("entry " + id).then(entryStored => {
      var entry = new Entry();
      entry.id = id;
      entry.category = entryStored.category;
      entry.date = entryStored.date;
      entry.income = entryStored.income;
      entry.libelle = entryStored.libelle;
      entry.value = entryStored.value;
      return entry;
    });
  }*/

  /**
   * @desc GET : => Entry[]
   * @returns {Promise<Entry>}
   */
  getAllEntries(entryDate: Date): Promise<Entry[]> {
    var entryTab: Entry[] = [];
    return this.storage.forEach((value, key, index) => {
      if (key.includes("entry")) {
        if (value.date.getMonth() === entryDate.getMonth() && value.date.getFullYear() === entryDate.getFullYear()) {
          value.value = parseFloat(value.value);
          entryTab.push(value);
        }
      }
    })
      .then(() => { return entryTab })
      .catch(() => "Probleme de parcours de la BDD")
  }

  /**
   * @desc SET : Entry
   * @param {Entry} entry
   */
  setEntry(entry: Entry, update?: boolean): Promise<void> {
    if (!update) {
      return this.getRandomID("entry")
        .then(id => {
          entry.id = id;
          this.storage.set("entry-" + id, entry)
            .then((() => this.notify("Nouvelle entrée créée")))
            .catch((() => this.notify("Erreur dans la création de la nouvelle entrée", true)))
        });
    } else {
      this.storage.set("entry-" + entry.id, entry)
        .then((() => this.notify("Entree modifiee")))
        .catch((() => this.notify("Erreur dans la modification de l'entrée", true)))
    }
  }

  /**
   * @desc UPDATE : supprime l'ancienne et ajoute la nouvelle
   * @param {Entry} newEntry - Nouvelle valeur
   * @returns {Promise<void>} Resolue quand la valeur a bien ete modifiee
   */
  updateEntry(newEntry: Entry): Promise<void> {
    return this.storage.remove("entry-" + newEntry.id)
      .then(() => {
        return this.setEntry(newEntry, true)
      })
      .catch(() => this.notify("Probleme lors de la suppression de l'entree", true))
  }

  /**
   * @desc DEL : id => boolean
   * @param {number} id
   * @returns {Promise<void>}
   */
  delEntry(id: number): Promise<void> {
    return this.storage.remove("entry-" + id)
      .then(() => this.notify("Entree supprimee"))
      .catch(() => this.notify("Probleme lors de la suppression de l'entree", true))
  }

  /**
   * @desc Cree un id random pour une table.
   * @param {string} table - Nom de la table en BDD.
   * @returns {Promise<number>}
   */
  getRandomID(table: string): Promise<number> {
    return this.storage.keys()
      .then(keys => {
        var rand: number = 0;
        while (keys.indexOf(table + "-" + rand) > -1) {
          rand = Math.floor(Math.random() * 10000);
        }
        return rand;
      })
      .catch(() => this.notify("Probleme de recuperation des cles en BDD", true));
  }

  /**
   * @desc Cree une notification avec un texte custom
   * @param {string} text - Texte a afficher
   * @param {boolean} error - Vrai si on affiche une erreur
   */
  notify(text: string, error?: boolean) {
    var config = {
      message: text,
      duration: 2000,
      position: "bottom",
      cssClass: ""
    };
    if (error) {
      config.cssClass = "alert-error";
    }
    const toast = this.toastCtrl.create(config);
    toast.present();
  }

}
