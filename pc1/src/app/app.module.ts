import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule, MatCardModule, MatFormFieldModule, 
    MatNativeDateModule, MatTabsModule, MatSlideToggleModule, 
    MatSnackBarModule, MatDividerModule, MatTableModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './routes';
import { PracticeService } from './practice/practice.service';
import { AuthService } from './auth/auth.service';
import { EntityService } from './entity/entity.service';
import { DateService } from './date.service';
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
import { ChartComponent } from './chart/chart/chart.component';
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { UserComponent } from './user/user/user.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { ProviderComponent } from './provider/provider/provider.component';
import { SpecialtyComponent } from './specialty/specialty/specialty.component';
import { SpecialtyListComponent } from './specialty/specialty-list/specialty-list.component';
import { DailySummaryComponent } from './daily-summary/daily-summary/daily-summary.component';
import { DailySummaryFormComponent } from './daily-summary/daily-summary-form/daily-summary-form.component';
import { DailySummaryListComponent } from './daily-summary/daily-summary-list/daily-summary-list.component';
import { DailySummaryContainerComponent } from './daily-summary/daily-summary-container/daily-summary-container.component';
import { CheckCompleteDirective } from './directives/check-complete.directive';
import { PracticeDetailComponent } from './practice/practice-detail/practice-detail.component';
import { DailySummaryChartComponent } from './daily-summary/daily-summary-chart/daily-summary-chart.component';
import { PracticeDetailSummaryComponent } from './practice/practice-detail-summary/practice-detail-summary.component';
import { PracticeDetailProvidersListComponent } from './practice/practice-detail-providers-list/practice-detail-providers-list.component';
import { PracticeDetailSpecialtiesListComponent } from './practice/practice-detail-specialties-list/practice-detail-specialties-list.component';
import { PracticeDetailProviderComponent } from './practice/practice-detail-provider/practice-detail-provider.component';
import { PracticeDetailSpecialtyComponent } from './practice/practice-detail-specialty/practice-detail-specialty.component';
import { PyChartComponent } from './chart/py-chart/py-chart.component';
import { NoDataComponent } from './no-data/no-data.component';
import { PyChartContainerComponent } from './chart/py-chart-container/py-chart-container.component';
import { TableContainerComponent } from './table/table-container/table-container.component';
import { TableComponent } from './table/table/table.component';

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
    ProviderComponent,
    SpecialtyComponent,
    SpecialtyListComponent,
    DailySummaryComponent,
    DailySummaryFormComponent,
    DailySummaryContainerComponent,
    DailySummaryListComponent,
    CheckCompleteDirective,
    PracticeDetailComponent,
    DailySummaryChartComponent,
    PracticeDetailSummaryComponent,
    PracticeDetailProvidersListComponent,
    PracticeDetailSpecialtiesListComponent,
    PracticeDetailProviderComponent,
    PracticeDetailSpecialtyComponent,
    PyChartComponent,
    NoDataComponent,
    PyChartContainerComponent,
    TableContainerComponent,
    TableComponent,
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
    MatTableModule
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
