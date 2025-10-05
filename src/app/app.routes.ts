import { Router, RouterOutlet, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LegalNotice } from './legal-notice/legal-notice.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'legal-notice', component: LegalNotice}
];
