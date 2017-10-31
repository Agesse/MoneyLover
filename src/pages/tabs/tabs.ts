import { Component } from '@angular/core';

import { StatsPage } from '../stats/stats';
import { MonthPage } from '../months/months';
import { SettingsPage } from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  months = MonthPage;
  stats = StatsPage;
  settings = SettingsPage;

  constructor() {
  }
}
