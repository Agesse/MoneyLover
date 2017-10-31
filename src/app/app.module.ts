import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MoneyLover } from './app.component';

import { StorageService } from "./services/storage.service";
import { CategoryService } from "./services/categories.service";

import { StatsPage } from '../pages/stats/stats';
import { SettingsPage } from "../pages/settings/settings";
import { CategoriesPage } from '../pages/settings/categories/categories';
import { MonthPage } from '../pages/months/months';
import { TabsPage } from '../pages/tabs/tabs';

import { AddEntry } from "../pages/modals/add-entry/modal-add-entry";
import { EditEntry } from "../pages/modals/edit-entry/modal-edit-entry";

import { MonthsConstant, DaysConstant } from "./constants/months.constants";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MoneyLover,
    StatsPage,
    SettingsPage,
    CategoriesPage,
    MonthPage,
    TabsPage,
    AddEntry,
    EditEntry
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MoneyLover,
      {
        monthNames: MonthsConstant,
        dayNames: DaysConstant
      }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MoneyLover,
    StatsPage,
    SettingsPage,
    CategoriesPage,
    MonthPage,
    TabsPage,
    AddEntry,
    EditEntry
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    CategoryService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
