import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule, MatCardModule, MatFormFieldModule, 
    MatNativeDateModule, MatTabsModule, MatSlideToggleModule, 
    MatSnackBarModule, MatDividerModule, MatTableModule, MatProgressSpinnerModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './routes';
import { PracticeService } from './services/practice.service';
import { AuthService } from './auth/auth.service';
import { EntityService } from './services/entity.service';
import { DateService } from './services/date.service';
import { DailySummaryService } from './services/daily-summary.service';
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
import { SourceComponent } from './source/source.component';
import { DashComponent } from './dash/dash/dash.component';
import { ChartComponent } from './dash/chart/chart.component';
import { ChartContainerComponent } from './dash/chart-container/chart-container.component';
import { DashSelectorComponent } from './dash/dash-selector/dash-selector.component';
import { EntityContainerComponent } from './entity/entity-container/entity-container.component';
import { LoadingComponent } from './loading/loading/loading.component';
import { DashContainerComponent } from './dash/dash-container/dash-container.component';
import { ReportingContainerComponent } from './reporting/reporting-container/reporting-container.component';
import { ReportingComponent } from './reporting/reporting/reporting.component';

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
    SourceComponent,
    DashComponent,
    ChartContainerComponent,
    DashSelectorComponent,
    EntityContainerComponent,
    LoadingComponent,
    DashContainerComponent,
    ReportingContainerComponent,
    ReportingComponent,
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
    MatProgressSpinnerModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    MatNativeDateModule,
    DateService, 
    PracticeService,
    AuthService,
    EntityService,
    AuthGuard,
    DailySummaryService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
