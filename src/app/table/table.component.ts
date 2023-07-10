import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchService, SortField } from "../search.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent {
  constructor(private searchService: SearchService) {
  }

  pokemons$ = this.searchService.pokemons$;

  handlePrevious(): void {
    this.searchService.searchPrevious();
  }

  handleNext(): void {
    this.searchService.searchNext();
  }

  handleSorting(column: string): void {
    const sortField: SortField = SortField[column.toString().toUpperCase() as keyof typeof SortField];
    this.searchService.updateSorting(sortField);
  }
}
