import { Component, computed } from '@angular/core';
import { ProfileService } from '../../../core/profile/profile-service';
import { FormsModule } from '@angular/forms';
import { UploadResume } from './upload-resume/upload-resume';

@Component({
  selector: 'app-skills',
  imports: [FormsModule, UploadResume],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  skillInput = '';

  constructor(private profileService: ProfileService) {}

  skills = computed(() => this.profileService.getCurrentUser()?.profile.skills ?? []);

  isModalOpen = false;

  openModal() {
    this.skillInput = '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.skillInput = '';
    this.isModalOpen = false;
  }

  addSkill() {
    const value = this.skillInput.trim();

    if (!value) {
      return;
    }

    const updatedSkills = [...this.skills(), value];

    this.profileService.updateSkills(updatedSkills);

    this.skillInput = '';
    this.closeModal()
  }

  removeSkill(skill: string) {
    const updatedSkills = this.skills().filter((s) => s !== skill);

    this.profileService.updateSkills(updatedSkills);
  }
}
