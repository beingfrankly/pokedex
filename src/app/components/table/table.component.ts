import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TableComponent {
  @Input({ required: true })
  data!: any[];

  @Input({ required: true })
  description!: string;

  @ContentChild('headers')
  headers: TemplateRef<any> | undefined;

  @ContentChild('rows')
  rows: TemplateRef<any> | undefined;
}
