import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ImportComponent } from './components/import/import.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { NgApexchartsModule } from 'ng-apexcharts';

// Components
import { AppComponent } from './app.component';
import { SearchOptionsComponent } from './components/search-options/search-options.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';

// Environment
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    SearchOptionsComponent,
    DashboardComponent,
    ChartComponent,
    CategoryComponent,
    CategoryFormComponent,
    SubmitButtonComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
