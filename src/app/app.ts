import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { AuthService } from './core/auth/auth-service';
import { JobActivityService } from './core/job-activity/job-activity-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('job-portal-poc');

  constructor(private authService: AuthService,private jobActivityService:JobActivityService) {}

  ngOnInit(): void {
    this.authService.initializeCurrentUser();
    this.jobActivityService.initializeCurrentJobActivity()
  }
}
