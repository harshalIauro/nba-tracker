import { GlobalUrl } from './utils/global-urls';
import { ApiService } from './api.service';
import { Component } from '@angular/core';
import { Team, TeamList } from './utils/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'NBA Score Tracking App';
}
