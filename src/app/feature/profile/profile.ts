import { Component } from '@angular/core';
import { Overview } from './overview/overview';
import { Education } from './education/education';
import { Experience } from './experience/experience';
import { Skills } from './skills/skills';

const profileOptions = ['overview', 'skills', 'education', 'experience'] as const;

type profileOptionTypes = (typeof profileOptions)[number];

@Component({
  selector: 'app-profile',
  imports: [
    Overview,
    Education,
    Experience,
    Skills,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  activeTab: profileOptionTypes = 'overview';

  setTab(tab: typeof this.activeTab) {
    this.activeTab = tab;
  }
}
