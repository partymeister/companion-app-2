import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SatellitePage } from './satellite.page';

const routes: Routes = [
  {
    path: '',
    component: SatellitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SatellitePageRoutingModule {}
