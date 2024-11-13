import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionComponent } from './components/sistem-pages/session/session.component';
import { StyleGuidComponent } from './style-guid/style-guid.component';


export const routes: Routes = [
  { path: '', component: SessionComponent },  
  { path: 'session', component: SessionComponent },
  { path: 'style-guid', component: StyleGuidComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
