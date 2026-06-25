import { Component, computed } from '@angular/core';
import { AuthStore } from '../../../core/auth/auth-store';
import { AuthService } from '../../../core/auth/auth-service';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  constructor(private authStore: AuthStore) {}

  userProfileInfo = computed(() => {
    const user = this.authStore.getCurrentUser();

    if (!user) return null;

    return {
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
    };
  });
}
