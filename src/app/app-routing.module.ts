import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/pokemon-detail/pokemon-detail.component').then(
        (m) => m.PokemonDetailComponent
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true, // Enabling this will bind query params to Component Inputs from v16
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
