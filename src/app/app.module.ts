import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';

import { Pro } from '@ionic/pro';

import { ErrorHandler, Injectable, Injector } from '@angular/core';

Pro.init('2bd9848f', {
  appVersion: '1.0'
})

@Injectable()
export class IonicErrorHandler extends ErrorHandler {

  constructor(injector: Injectable) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);
  }
}


@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Facebook,
    AdMobPro,
    AppRate,
    IonicErrorHandler,
    [
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
