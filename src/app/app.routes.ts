import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { OtpComponent } from './components/otp/otp.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NumberComponent } from './components/number/number.component';
import { SearchComponent } from './components/search/search.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TabComponent } from './components/tab/tab.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { TagsComponent } from './components/tags/tags.component';
import { StagesComponent } from './components/stages/stages.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ToastComponent } from './components/toast/toast.component';


export const routes: Routes = [
  { path: 'button', component: ButtonsComponent }, 
  { path: 'radio-button', component:RadioButtonComponent },
  { path:'checkbox', component:CheckboxComponent },
  { path:'toggle', component:ToggleComponent },
  { path:'text', component:TextFieldComponent },
  { path:'otp', component:OtpComponent },
  { path:'calender', component:CalendarComponent },
  { path:'number', component:NumberComponent },
  { path:'search', component:SearchComponent },
  { path:'sidebar', component:SideNavigationComponent },
  { path:'tab', component:TabComponent },
  { path:'breadcrumbs', component:BreadcrumbsComponent },
  { path:'tags', component:TagsComponent },
  { path:'stages', component:StagesComponent },
  { path:'avatar', component:AvatarComponent },
  { path:'toast', component:ToastComponent },
  // { path: '', redirectTo: '/button', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
