import { CommonModule, KeyValue } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  trackByFn(index: number, item: any): any {
    return item.id || index; // Assuming each row has an id, fallback to index if not
  }
}
