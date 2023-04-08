import { GlobalUrl } from '../utils/global-urls';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TeamDetails } from '../utils/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() showResult = new EventEmitter();
  @Output() removeCard = new EventEmitter();
  @Input() teamDetails: TeamDetails | undefined;
  logo: string = GlobalUrl.logoUrl;

  constructor() { }

  /**
   * @description Check team abbreviation, If it present then fetch the logo of the team.
   */
  ngOnInit() {
    if (this.teamDetails && this.teamDetails.abbreviation) {
      this.logo += `/${this.teamDetails.abbreviation}.png`;
    }
  }

  /**
   * @description Emit the event for dashboard component to display the results of team.
   */
  seeResult(): void {
    this.showResult.emit(this.teamDetails)
  }

  /**
   * @description To remove the card after click on cross button from list
   */
  deleteCard(): void {
    this.removeCard.emit(this.teamDetails?.id)
  }

}
