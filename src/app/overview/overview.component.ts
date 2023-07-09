import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, SearchComponent, TableComponent],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

}
