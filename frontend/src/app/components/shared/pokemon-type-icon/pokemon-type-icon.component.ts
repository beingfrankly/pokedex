import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-pokemon-type-icon",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./pokemon-type-icon.component.html",
  styleUrls: ["./pokemon-type-icon.component.css"],
})
export class PokemonTypeIconComponent {
  @Input()
  pokemonType!: string;

  @Input()
  imageHeight: string = "32px";

  @Input()
  imageWidth: string = "32px";

  get pokemonTypeIcon(): string {
    return `../../assets/${this.pokemonType}.svg`;
  }
}
