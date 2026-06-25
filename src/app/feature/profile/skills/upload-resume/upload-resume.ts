import { Component } from '@angular/core';
import { ProfileService } from '../../../../core/profile/profile-service';

@Component({
  selector: 'app-upload-resume',
  imports: [],
  templateUrl: './upload-resume.html',
  styleUrl: './upload-resume.css',
})
export class UploadResume {
  selectedFile?: File;

  constructor(private profileService: ProfileService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    this.selectedFile = input.files?.[0];
  }

  async saveResume() {
    if (!this.selectedFile) return;

    await this.profileService.uploadResume(this.selectedFile);

    this.selectedFile = undefined;
  }

  removeResume() {
    this.selectedFile = undefined;
    this.profileService.removeResume();
  }

  get resume() {
    return this.profileService.getCurrentUser()?.profile.resume;
  }

  viewResume() {
    if (!this.resume) return;

    this.openBase64PDF(this.resume);
  }

  private openBase64PDF(base64: string) {
    const parts = base64.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';

    const bstr = atob(parts[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    const blob = new Blob([u8arr], { type: mime });

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
