import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { PracticeOutletComponent } from './practice/practice-outlet/practice-outlet.component';
import { ProviderOutletComponent } from './provider/provider-outlet/provider-outlet.component';
import { ProviderManagerContainerComponent } from './provider/provider-manager-container/provider-manager-container.component';
import { ReportingContainerComponent } from './reporting/reporting-container/reporting-container.component';
import { DailySummaryFormComponent } from './daily-summary/daily-summary-form/daily-summary-form.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityContainerComponent } from './entity/entity-container/entity-container.component';
import { EntityComponent } from './entity/entity/entity.component';
import { SpecialtiesResolverService} from './resolvers/specialties-resolver.service'
import { ProviderResolverService} from './resolvers/provider-resolver.service';
import { ProvidersResolverService} from './resolvers/providers-resolver.service';
import { ProviderManagerComponent } from './practice/provider-manager/provider-manager.component';
import { ProviderFormComponent } from './provider/provider-form/provider-form.component';
import { AuthGuard } from './auth-guard';

export const appRoutes: Routes = [
	{
		path: 'practices/:practice_slug',
		// canActivate: [AuthGuard],
		component: PracticeOutletComponent,
		children: [
			{
				path: '',
			 	component: PracticeContainerComponent
			 },
			 {
			 	path: 'reporting',
			 	component: ReportingContainerComponent
			 },
			 {
			 	path: 'providers',
			 	component: ProviderManagerContainerComponent,
			 	resolve: {
			 		specialties: SpecialtiesResolverService,
			 		provider: ProviderResolverService,
			 		providers: ProvidersResolverService,
			 	},
			 	children: [
			 		{
			 			path: 'form',
			 			component: ProviderFormComponent
			 		},
			 		{
			 			path: 'list',
			 			component: ProviderManagerComponent
			 		}
			 	]
			 }
		]
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
