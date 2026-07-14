import { Component, computed } from '@angular/core';
import { ProfileService } from '../../../core/profile/profile-service';
import { Education as EducationType } from '../../../core/profile/profile.model';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-education',
  imports: [FormsModule,TranslatePipe],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  constructor(private profileService: ProfileService) {}

  educationList = computed(() => this.profileService.getCurrentUser()?.profile.education ?? []);

  institution = '';
  degree = '';
  fieldOfStudy = '';
  startYear = '';
  endYear = '';

  // modal + edit state
  isModalOpen = false;
  editingEducationId: string | null = null;

  openModal(education?: EducationType) {
    this.isModalOpen = true;

    if (!education) {
      this.resetForm();
      this.editingEducationId = null;
      return;
    }

    this.editingEducationId = education.id;
    this.institution = education.institution;
    this.degree = education.degree;
    this.fieldOfStudy = education.fieldOfStudy;
    this.startYear = education.startYear;
    this.endYear = education.endYear;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveEducation(): void {
    if (
      !this.institution.trim() ||
      !this.degree.trim() ||
      !this.fieldOfStudy.trim() ||
      !this.startYear ||
      !this.endYear
    ) {
      return;
    }

    const education: EducationType = {
      id: this.editingEducationId ?? crypto.randomUUID(),
      institution: this.institution.trim(),
      degree: this.degree.trim(),
      fieldOfStudy: this.fieldOfStudy.trim(),
      startYear: this.startYear,
      endYear: this.endYear,
    };

    this.profileService.updateEducation(education);

    this.resetForm();
    this.closeModal();
  }

  removeEducation(id: string) {
    this.profileService.deleteEducation(id);
  }

  private resetForm() {
    this.institution = '';
    this.degree = '';
    this.fieldOfStudy = '';
    this.startYear = '';
    this.endYear = '';
    this.editingEducationId = null;
  }
}
