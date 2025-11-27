import { Component, Input } from '@angular/core';
import { NOT_FOUND } from 'src/app/constants/constants.utils';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  @Input() title: string = NOT_FOUND;
  titlePage: string = "Error page informations";
  public options!: Option[];

  constructor() { }

}
