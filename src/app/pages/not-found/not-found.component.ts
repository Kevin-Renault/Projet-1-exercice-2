import { Component, Input } from '@angular/core';
import { NOT_FOUND } from 'src/app/constants/constants.utils';
import { Stat } from 'src/app/models/stat.model';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  titlePage: string = "Error page informations";
  public stats!: Stat[];
  @Input() notFound: string = NOT_FOUND;

  constructor() { }

}
