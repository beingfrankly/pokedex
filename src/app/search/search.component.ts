import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchService } from "../search.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { PokemonType } from "../types/pokemon-type";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  searchForm = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
  });

  @Input()
  pokemonTypes!: PokemonType[];

  @Output()
  typeChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private searchService: SearchService) {}

  onTypeChange() {
    this.typeChange.emit(this.searchForm.get("type")?.value);
  }

  onSubmit() {
    this.searchService.updatePokemonSearch({
      name: this.searchForm.get("name")?.value ?? "",
    });
  }
}
