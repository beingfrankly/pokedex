import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconName } from 'src/app/types/icon-name';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input()
  name!: IconName;

  iconName = IconName;
}
