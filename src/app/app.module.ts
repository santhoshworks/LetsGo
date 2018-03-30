import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewpollComponent } from './newpoll/newpoll.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VoteComponent } from './vote/vote.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OptionsComponent } from './options/options.component';
import { FirebaseApiService } from './services/firebase-api.service';
import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewpollComponent,
    OpinionsComponent,
    HeaderComponent,
    FooterComponent,
    VoteComponent,
    OptionsComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [FirebaseApiService, AuthService, NotifyService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
