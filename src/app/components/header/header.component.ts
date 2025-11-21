import { Component, Input } from '@angular/core';
import { Stat } from 'src/app/models/stat.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title!: string;
  @Input() stats!: Stat[];

}
