import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchService } from "../search.service";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [CommonModule],
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
}
