import { Component, computed } from '@angular/core';
import { Experience as ExperienceType } from '../../../core/profile/profile.model';
import { ProfileService } from '../../../core/profile/profile-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-experience',
  imports: [FormsModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  constructor(private profileService: ProfileService) {}

  experienceList = computed(() => this.profileService.getCurrentUser()?.profile.experience ?? []);

  // form state
  company = '';
  role = '';
  location = '';
  startDate = '';
  endDate = '';
  description = '';

  // modal + edit state
  isModalOpen = false;
  editingId: string | null = null;

  openModal(exp?: ExperienceType) {
    this.isModalOpen = true;

    if (!exp) {
      this.resetForm();
      this.editingId = null;
      return;
    }

    this.editingId = exp.id;
    this.company = exp.company;
    this.role = exp.role;
    this.location = exp.location;
    this.startDate = exp.startDate;
    this.endDate = exp.endDate;
    this.description = exp.description ?? '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveExperience() {
    const experience: ExperienceType = {
      id: this.editingId ?? crypto.randomUUID(),
      company: this.company,
      role: this.role,
      location: this.location,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
    };

    this.profileService.updateExperience(experience);

    this.resetForm();
    this.closeModal();
  }

  removeExperience(id: string) {
    this.profileService.deleteExperience(id);
  }

  private resetForm() {
    this.company = '';
    this.role = '';
    this.location = '';
    this.startDate = '';
    this.endDate = '';
    this.description = '';
    this.editingId = null;
  }
}
