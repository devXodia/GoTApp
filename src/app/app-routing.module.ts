import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

import { CharacterdetailsComponent } from './components/characterdetails/characterdetails.component';
import { HousedetailsComponent } from './components/housedetails/housedetails.component';

const routes: Routes = [
  { path: '', component: NavComponent },
  { path: 'character/:name', component: CharacterdetailsComponent },
  { path: 'house/:house', component: HousedetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
