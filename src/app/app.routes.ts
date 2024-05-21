import { Routes } from '@angular/router';
import { CdkComponent } from './cdk/cdk.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'cdk',
    component: CdkComponent,
  },
  { path: '', component: HomeComponent },
];
