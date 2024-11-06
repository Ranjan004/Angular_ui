import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionComponent } from './components/sistem-pages/session/session.component';

export const routes: Routes = [
  { path: '', component: SessionComponent },  // Home page route
  { path: 'session', component: SessionComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all route to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
