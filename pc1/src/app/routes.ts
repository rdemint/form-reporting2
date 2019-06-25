import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { ReportingContainerComponent } from './reporting/reporting-container/reporting-container.component';
import { DailySummaryFormComponent } from './daily-summary/daily-summary-form/daily-summary-form.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityContainerComponent } from './entity/entity-container/entity-container.component';
import { EntityComponent } from './entity/entity/entity.component';
import { AuthGuard } from './auth-guard';

export const appRoutes: Routes = [
	{
		path: 'practices/:practice_slug',
		// canActivate: [AuthGuard],
		component: PracticeContainerComponent,
	},
	{
		path: 'practices/:practice_slug/reporting',
		// canActivate: [AuthGuard],
		component: ReportingContainerComponent
	},
	{
		path: 'entities/:entity_slug',
		// canActivate: [AuthGuard],
		component: EntityContainerComponent,
	},
	{	path: 'login',
		component: LoginComponent,
	},
	{
		path:'logout',
		component: LogoutComponent,
	},
	{	path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},

]