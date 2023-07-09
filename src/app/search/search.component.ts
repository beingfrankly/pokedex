import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchService } from "../search.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
  });

  constructor(private searchService: SearchService) {}

  get name() {
    return this.searchForm.get("name");
  }

  onSubmit() {
      this.searchService.searchOnName({
        name: this.name?.value ?? ""
      });
  }
}
