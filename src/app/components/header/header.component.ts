import { Component, Input } from '@angular/core';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title!: string;
  @Input() options!: Option[];

}
