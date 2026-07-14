import { Component } from '@angular/core';
import { Overview } from './overview/overview';
import { Education } from './education/education';
import { Experience } from './experience/experience';
import { Skills } from './skills/skills';
import { TranslatePipe } from '@ngx-translate/core';

const profileOptions = ['overview', 'skills', 'education', 'experience'] as const;

type profileOptionTypes = (typeof profileOptions)[number];

type tabsArrType = {
  key: profileOptionTypes;
};

@Component({
  selector: 'app-profile',
  imports: [Overview, Education, Experience, Skills,TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  tabs: tabsArrType[] = [
    { key: 'overview' },
    { key: 'skills' },
    { key: 'education' },
    { key: 'experience' },
  ];

  activeTab: profileOptionTypes = 'overview';

  setTab(tab: typeof this.activeTab) {
    this.activeTab = tab;
  }
}
