import { Routes } from '@angular/router';

import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { PracticeOutletComponent } from './practice/practice-outlet/practice-outlet.component';
import { ProviderOutletComponent } from './provider/provider-outlet/provider-outlet.component';
import { ProviderManagerContainerComponent } from './provider/provider-manager-container/provider-manager-container.component';
import { ReportingContainerComponent } from './reporting/reporting-container/reporting-container.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityContainerComponent } from './entity/entity-container/entity-container.component';
import { SpecialtiesResolverService} from './resolvers/specialties-resolver.service'
import { ProviderResolverService} from './resolvers/provider-resolver.service';
import { ProvidersResolverService} from './resolvers/providers-resolver.service';
import { ProviderFormContainerComponent } from './provider/provider-form-container/provider-form-container.component';
import { HomeOutletComponent } from './nav/home-outlet/home-outlet.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';

export const appRoutes: Routes = [
	{	path: 'home',
		// canActivate: [AuthGuard],
		component: HomeOutletComponent,
		children: [
			{
			path: 'practices/:practice_slug',
			// canActivate: [AuthGuard],
			component: PracticeOutletComponent,
			children: [
				{
					path: 'dashboard',
				 	component: PracticeContainerComponent
				 },
				 {
				 	path: 'reporting',
				 	component: ReportingContainerComponent
				 },
				 {
				 	path: 'providers',
				 	component: ProviderOutletComponent,
				 	runGuardsAndResolvers: 'always',
				 	resolve: {
						 specialties: SpecialtiesResolverService,		 		
				 	},
				 	children: [
				 		{
				 			path: 'form',
				 			component: ProviderFormContainerComponent,
				 			resolve: {provider: ProviderResolverService}			 			
				 		},

				 		{
				 			path: 'list',
							 component: ProviderManagerContainerComponent,
							resolve: {
								providers: ProvidersResolverService,
							} 
						 },
						{
							path: '',
							redirectTo: 'list',
							pathMatch: 'full'
						}
				 	]
				 }
			]
			},
			{
				path: 'entities/:entity_slug',
				// canActivate: [AuthGuard],
				component: EntityContainerComponent,
			}
		]
	},
	{	path: 'login',
		component: LoginComponent,
	},
	{
		path:'logout',
		component: LogoutComponent,
	},
	{
		path:'unauthorized',
		component: UnauthorizedComponent,
	},
	{	
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	}
]
