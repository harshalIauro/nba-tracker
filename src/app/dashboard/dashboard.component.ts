import { Game, GameDetails, Score } from '../utils/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Team, TeamDetails, TeamList } from '../utils/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: Team[] = [];
  selectedOption: number = 0;
  selectedTeams: TeamDetails[] = [];
  isLoading = false;

  constructor(private apiService: ApiService, private router: Router) { }

  /**
   * @description Get all team list and Get selected teams details from session storage.
   */
  ngOnInit() {
    this.getTeams();
    const selectedTeams: TeamDetails[] = this.apiService.getStorage('selectedTeams');
    if (selectedTeams && selectedTeams.length) {
      this.selectedTeams = selectedTeams;
    }
  }

  /**
   * @description Get all teams list.Set first team selected by deafult.
   */
  getTeams(): void {
    this.apiService.getAllTeams().subscribe((response: TeamList) => {
      if (response.data && response.data.length) {
        this.options = response.data;
        this.selectedOption = this.options[0].id;
      } else {
        this.options = [];
      }
    }, (error: Error) => {
      console.log(error);
      this.options = [];
    })
  }

  /**
   * @param id : number
   * @description Get team details from options array using team id.
   */
  getTeamDetail(id: number): Team | undefined {
    return this.options.find((team: Team) => team.id === id);
  }

  /**
   * @param team : Team
   * @description Navigate the page when we click on show result button in card component.
   * To display the team result.
   */
  showResult(team: Team): void {
    this.router.navigate(['/results', team.id])
  }

  /**
   * @param id : number
   * @description Remove the team from selected team array when click on cross button in card component.
   */
  removeTeam(id: number): void {
    const index: number = this.getTeamIndex(this.selectedTeams, id);
    if (index !== -1) {
      this.selectedTeams.splice(index, 1)
    }
    this.apiService.setStorage('selectedTeams', this.selectedTeams);
  }

  /**
   * @param teamList TeamDetails
   * @param id number
   * @description Get team index using team id from selected team.
   */
  getTeamIndex(teamList: TeamDetails[], id: number): number {
    return teamList.findIndex((team: TeamDetails) => team.id === id);
  }

  /**
   * @description Get last 12 days dates to get the details results of the team.
   */
  getLastTwelveDates(): string {
    const today: Date = new Date();
    const dates: string[] = [];
    for (let index: number = 0; index < 12; index++) {
      const date: Date = new Date(today);
      date.setDate(today.getDate() - index - 1);
      dates.push(date.toISOString().slice(0, 10))
    }
    return dates.join('&dates[]=');
  }

  /**
   * @param abbreviation string
   * @description To check the team is present in selected teams array.If is not present 
   * only then we will fetch the team details.
   */
  checkTeamExist(abbreviation: string): number {
    return this.selectedTeams.findIndex((team: TeamDetails) => team.abbreviation === abbreviation);
  }

  /**
   * @param teamId : number
   * @description This function is used to get the team details of last 12 days.
   */
  trackTeam(teamId: number): void {
    const team: Team | undefined = this.getTeamDetail(+teamId);
    if (team && this.checkTeamExist(team.abbreviation) === -1) {
      this.isLoading = true;
      const dates: string = this.getLastTwelveDates();
      const params: string = `dates[]=${dates}&per_page=12&team_ids[]=${teamId}`;
      this.apiService.getGameDetails(params).subscribe((response: GameDetails) => {
        this.isLoading = false;
        this.setTeamResponse(response.data, team)
      }, (error: Error) => {
        this.isLoading = false;
        console.log(error);
      })
    }
  }

  /**
   * @description To set the team result which we need to show in results page
   */
  setScores(selectedTeam: string, opponentTeam: string, selectedTeamScore: number, opponentTeamScore: number): Score {
    return { selectedTeam, opponentTeam, selectedTeamScore, opponentTeamScore };
  }

  /**
   * @description To set the teams data as per our need to display in card and result page.
   */
  setTeamResponse(data: Game[], team: Team): void {
    const teamDetails: TeamDetails = { id: team.id, name: team.name, abbreviation: team.abbreviation, conference: team.conference, results: [], avgPtsScore: 0, avgPtsConceded: 0, scores: [] };
    let teamScore: number = 0;
    let opponentTeamScore: number = 0;
    const totalRecord: number = data.length;
    for (const teams of data) {
      if (teams.home_team.abbreviation === team.abbreviation) {
        teamScore += teams.home_team_score;
        teams.home_team_score > teams.visitor_team_score ? teamDetails.results.push('W') : teamDetails.results.push('L');
        const score: Score = this.setScores(teams.home_team.abbreviation, teams.visitor_team.abbreviation, teams.home_team_score, teams.visitor_team_score);
        teamDetails.scores.push(score);
      } else {
        opponentTeamScore += teams.home_team_score;
        const score: Score = this.setScores(teams.visitor_team.abbreviation, teams.home_team.abbreviation, teams.visitor_team_score, teams.home_team_score);
        teamDetails.scores.push(score);
      }
      if (teams.visitor_team.abbreviation === team.abbreviation) {
        teamScore += teams.visitor_team_score;
        teams.home_team_score < teams.visitor_team_score ? teamDetails.results.push('W') : teamDetails.results.push('L');
      } else {
        opponentTeamScore += teams.visitor_team_score;
      }
    }
    teamDetails.avgPtsScore = +((teamScore / totalRecord).toFixed(2));
    teamDetails.avgPtsConceded = +((opponentTeamScore / totalRecord).toFixed(2));
    this.selectedTeams.push(teamDetails);
    this.selectedTeams = [...this.selectedTeams];
    this.apiService.setStorage('selectedTeams', this.selectedTeams);
  }
}
