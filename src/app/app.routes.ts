import { Routes } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'legal-notice', component: LegalNoticeComponent},
    {path: 'privacy-policy', component: PrivacyComponent}
];