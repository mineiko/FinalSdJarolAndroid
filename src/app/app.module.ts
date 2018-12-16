import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from "@angular/common/http";
import { ModalCopiesComponent } from '../pages/modal-copies/modal-copies.component';
import { LoginComponent } from '../pages/login/login.component';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { AccessComponent } from '../pages/access/access.component';
import { ModalAccessComponent } from '../pages/modal-access/modal-access.component';
import { UsersComponent } from '../pages/users/users.component';
import { ModalUsersComponent } from '../pages/modal-users/modal-users.component';
import { CopiesusersComponent } from '../pages/copiesusers/copiesusers.component';
import { ModalCopiesUsersComponent } from '../pages/modal-copiesusers/modal-copiesusers.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalCopiesComponent,
    LoginComponent,
    InicioComponent,
    AccessComponent,
    ModalAccessComponent,
    UsersComponent,
    ModalUsersComponent,
    CopiesusersComponent,
ModalCopiesUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalCopiesComponent,
    LoginComponent,
    InicioComponent,
    AccessComponent,
    ModalAccessComponent,
    UsersComponent,
    ModalUsersComponent,
    CopiesusersComponent,
    ModalCopiesUsersComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
