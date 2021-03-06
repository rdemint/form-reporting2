import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule, MatCardModule, MatFormFieldModule,
    MatNativeDateModule, MatTabsModule, MatSlideToggleModule,
    MatSnackBarModule, MatDividerModule, MatTableModule, MatProgressSpinnerModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { appRoutes } from './routes';
import { PracticeService } from './services/practice.service';
import { AuthService } from './auth/auth.service';
import { EntityService } from './services/entity.service';
import { DateService } from './services/date.service';
import { ProviderService } from './services/provider.service';
import { DailySummaryService } from './services/daily-summary.service';
import { ErrorService } from './services/error.service';
import { MessageService } from './services/message.service';
import { DashService } from './services/dash.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form/form.component';
import { FormsModule} from '@angular/forms';

import { AuthGuard } from './auth-guard';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PracticeComponent } from './practice/practice/practice.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityComponent } from './entity/entity/entity.component';
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { UserComponent } from './user/user/user.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { SpecialtyListComponent } from './specialty/specialty-list/specialty-list.component';
import { DailySummaryComponent } from './daily-summary/daily-summary/daily-summary.component';
import { DailySummaryFormComponent } from './daily-summary/daily-summary-form/daily-summary-form.component';
import { DailySummaryListComponent } from './daily-summary/daily-summary-list/daily-summary-list.component';
import { CheckCompleteDirective } from './directives/check-complete.directive';
import { PyChartComponent } from './chart/py-chart/py-chart.component';
import { NoDataComponent } from './no-data/no-data.component';
import { PyChartContainerComponent } from './chart/py-chart-container/py-chart-container.component';
import { TableContainerComponent } from './dash/table-container/table-container.component';
import { TableComponent } from './dash/table/table.component';
import { DashComponent } from './dash/dash/dash.component';
import { ChartComponent } from './dash/chart/chart.component';
import { ChartContainerComponent } from './dash/chart-container/chart-container.component';
import { DashSelectorComponent } from './dash/dash-selector/dash-selector.component';
import { EntityContainerComponent } from './entity/entity-container/entity-container.component';
import { LoadingComponent } from './loading/loading/loading.component';
import { DashContainerComponent } from './dash/dash-container/dash-container.component';
import { ReportingContainerComponent } from './reporting/reporting-container/reporting-container.component';
import { ReportingComponent } from './reporting/reporting/reporting.component';
import { NavComponent } from './practice/nav/nav.component';
import { ProviderFormContainerComponent } from './provider/provider-form-container/provider-form-container.component';
import { ProviderFormComponent } from './provider/provider-form/provider-form.component';
import { PracticeOutletComponent } from './practice/practice-outlet/practice-outlet.component';
import { ProviderOutletComponent } from './provider/provider-outlet/provider-outlet.component';
import { ProviderManagerContainerComponent } from './provider/provider-manager-container/provider-manager-container.component';
import { ProviderManagerComponent } from './practice/provider-manager/provider-manager.component';
import { SpecialtiesResolverService } from './resolvers/specialties-resolver.service';
import { ProviderResolverService } from './resolvers/provider-resolver.service';
import { ProvidersResolverService } from './resolvers/providers-resolver.service';
import { OrgNavComponent } from './nav/org-nav/org-nav.component';
import { OrgNavContainerComponent } from './nav/org-nav-container/org-nav-container.component';
import { HomeOutletComponent } from './nav/home-outlet/home-outlet.component';
import { OrganizationTypeService } from './services/organization-type.service';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { CollectionService } from './services/collection.service';
import { CollectionComponent } from './collection/collection/collection.component';
import { CollectionContainerComponent } from './collection/collection-container/collection-container.component';
import { TwoDecimalPlacesDirective } from './directives/two-decimal-places.directive';
import { ChartJsComponent } from './dash/chart-js/chart-js.component';
import { ChartJsContainerComponent } from './dash/chart-js-container/chart-js-container.component';
import { Ng2ChartComponent } from './dash/ng2-chart/ng2-chart.component';
import { Ng2ChartContainerComponent } from './dash/ng2-chart-container/ng2-chart-container.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PracticeComponent,
    LoginComponent,
    LogoutComponent,
    EntityComponent,
    ChartComponent,
    PracticeContainerComponent,
    UserComponent,
    PracticeListComponent,
    ProviderListComponent,
    SpecialtyListComponent,
    DailySummaryComponent,
    DailySummaryFormComponent,
    DailySummaryListComponent,
    CheckCompleteDirective,
    PyChartComponent,
    NoDataComponent,
    PyChartContainerComponent,
    TableContainerComponent,
    TableComponent,
    ChartContainerComponent,
    DashSelectorComponent,
    EntityContainerComponent,
    LoadingComponent,
    DashContainerComponent,
    DashComponent,
    ReportingContainerComponent,
    ReportingComponent,
    NavComponent,
    ProviderFormContainerComponent,
    ProviderFormComponent,
    PracticeOutletComponent,
    ProviderOutletComponent,
    ProviderManagerComponent,
    ProviderManagerContainerComponent,
    OrgNavComponent,
    OrgNavContainerComponent,
    HomeOutletComponent,
    UnauthorizedComponent,
    CollectionComponent,
    CollectionContainerComponent,
    TwoDecimalPlacesDirective,
    ChartJsComponent,
    ChartJsContainerComponent,
    Ng2ChartComponent,
    Ng2ChartContainerComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    ChartsModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    MatNativeDateModule,
    DateService,
    MessageService,
    ErrorService,
    DashService,
    PracticeService,
    ProviderService,
    AuthService,
    EntityService,
    AuthGuard,
    DailySummaryService,
    SpecialtiesResolverService,
    OrganizationTypeService,
    ProviderResolverService,
    ProvidersResolverService,
    CollectionService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
