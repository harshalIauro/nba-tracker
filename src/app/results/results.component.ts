import { TeamDetails } from '../utils/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  teamDetails: TeamDetails | undefined;

  constructor(private location: Location, private apiService: ApiService, private router: ActivatedRoute) { }

  /**
   * @description Get all selected teams from session storage.Get team code from route paramter.
   * fetch the team details and scores using teamcode.
   */
  ngOnInit(): void {
    const selectedTeams = this.apiService.getStorage('selectedTeams');
    const teamCode = this.router.snapshot.paramMap.get('teamCode');
    if (teamCode && selectedTeams && selectedTeams.length) {
      const index = selectedTeams.findIndex((team: any) => team.id === +teamCode);
      if (index !== -1) {
        this.teamDetails = selectedTeams[index]
      }
    }
  }

  /**
   * @description Back to previous all team list page.
   */
  backToTeams(): void {
    this.location.back();
  }

}
