import { Injectable } from "@angular/core";

//import { Storage } from "@ionic/storage";

import { Category } from "../classes/category";
import { MOCK_C } from "../mocks/categories.mock";

@Injectable()
export class CategoryService {

  constructor() {
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
  getAllCategories(): Category[] {
    //return this.storage.keys().then(keys => {
    var categoryTab: Category[] = [];
    //todo: enlever le MOCK_C
    for (var i = 0, l = MOCK_C.length; i < l; i++) {
      var category = new Category();
      category.id = MOCK_C[i].id;
      category.cssSelector = MOCK_C[i].cssSelector;
      category.color = MOCK_C[i].color;
      category.maxBudget = MOCK_C[i].maxBudget;
      category.name = MOCK_C[i].name;
      categoryTab.push(category);
    }
    return categoryTab;
    /*for (var i = 0, l = keys.length; i < l; i++) {
      if (keys[i].includes("entry")) {
        this.storage.get(keys[i]).then(entry => {
          entryTab.push(entry);
        })
      }
    }*/
    //return entryTab;
    //});
  }

  /**
   * @desc SET : Entry
   * @param {Entry} entry
   */
  /*setEntry(entry: Entry): Promise<void> {
    return this.getRandomID("entry ").then(id => {
      entry.id = id;
      this.storage.set("entry ", Entry).then((setOK => {
        return true;
      }), (setKO => {
        return false;
      }));
    });
  }*/

  /**
   * @desc UPDATE : id, cle, valeur => boolean
   * @param {number} id - ID de l'Entry a modifier
   * @param {string} key - Cle a modifier dans l'Entry
   * @param {string} value - Nouvelle valeur
   * @returns {Promise<boolean>} True si l'update est OK, false sinon.
   */
  /*updateEntry(id: number, key: string, value: string): Promise<void> {
    return this.storage.get("entry " + id).then(entry => {
      entry[key] = value;
      this.storage.set("entry " + id, entry).then(updateOK => {
        return true;
      }, (updateKO => {
        return false;
      }));
    });
  }*/

  /**
   * @desc DEL : id => boolean
   * @param {number} id
   * @returns {Promise<boolean>} True si l'update est OK, false sinon.
   */
  /*delEntry(id: number): Promise<boolean> {
    return this.storage.remove("entry " + id).then(delOK => {
      return true;
    }, delKO => {
      return false;
    });
  }*/

  /**
   * @desc Cree un id random pour une table.
   * @param {string} table - Nom de la table en BDD.
   * @returns {Promise<number>}
   */
  /*getRandomID(table: string): Promise<number> {
    return this.storage.keys().then(keys => {
      var rand: number = 0;
      while (keys.indexOf(table + rand) > -1) {
        rand = Math.floor(Math.random() * 10000);
      }
      return rand;
    });
  }*/

}
