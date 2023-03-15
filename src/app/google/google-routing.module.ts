import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'',
    component:SearchComponent
  },
  {path:'search',
  component:SearchResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleRoutingModule { }
