import { Component } from '@angular/core';

const profileOptions = ['overview', 'skills', 'education', 'experience'] as const;

type profileOptionTypes = (typeof profileOptions)[number];

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  activeTab: profileOptionTypes = 'overview';

  setTab(tab: typeof this.activeTab) {
    this.activeTab = tab;
  }
}
