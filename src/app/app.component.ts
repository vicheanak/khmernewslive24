import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'ទំព័រដើម',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'ពត៌មាន Live',
      url: '/home/2',
      icon: 'logo-rss'
    },
    {
      title: 'សិល្បះ & កំសាន្ត',
      url: '/home/3',
      icon: 'film'
    },
    {
      title: 'សុខភាព & ជីវិត',
      url: '/home/4',
      icon: 'happy'
    },
    {
      title: 'យល់ដឹង',
      url: '/home/1',
      icon: 'bulb'
    },
    {
      title: 'ប្លែកៗ',
      url: '/home/6',
      icon: 'bug'
    },
    {
      title: 'កីឡា',
      url: '/home/16',
      icon: 'football'
    },
    {
      title: 'បច្ចេកវិទ្យា',
      url: '/home/17',
      icon: 'logo-steam'
    },
    {
      title: 'ទំនាក់ទំនង',
      url: '/contact',
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private admob: AdMobPro,
    private appRate: AppRate,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      // or, override the whole preferences object
      this.appRate.preferences = {
        usesUntilPrompt: 2,
        storeAppURL: {
         ios: '849930087',
         android: 'market://details?id=com.khmernewslive24.app'
        },
        customLocale: {
              title: 'សូមជួយដាក់ពិន្ទុអោយផងណា?',
              message: 'អរគុណទុកជាមុន សម្រាប់ការផ្តល់ពិន្ទុអោយកម្មវីធីយើងខ្ញុំ',
              cancelButtonLabel: 'មិនផ្តល់',
              rateButtonLabel: 'ផ្តល់',
              laterButtonLabel: 'ចាំពេលក្រោយ'
            }
      };

      this.appRate.promptForRating(false);


      let videoAd;
      let bannerAd;
      if(this.platform.is('android')) 
      {
        videoAd = 'ca-app-pub-3976244179029334/8229934618';
        bannerAd = 'ca-app-pub-3976244179029334/1085941767';
      } 
      else if (this.platform.is('ios')) 
      {
        videoAd = 'ca-app-pub-3976244179029334/3015344375';
        bannerAd = 'ca-app-pub-3976244179029334/4011488000';
      }
      setTimeout(() => {
        this.admob.prepareRewardVideoAd({adId: videoAd})
        .then(() => { 
            this.admob.showRewardVideoAd(); 
        });
      }, 60000);

      this.admob.createBanner({adId: bannerAd})
      .then(() => {this.admob.showBanner(1)});

    });
  }
}
