import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryModalPage } from './entry-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EntryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryModalPageRoutingModule {}
