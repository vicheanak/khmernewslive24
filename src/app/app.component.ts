import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Pro } from '@ionic/pro';

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

  public deployChannel = "";
  public isBeta = false;
  public downloadProgress = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private admob: AdMobPro,
    private appRate: AppRate,
  ) {
    this.checkChannel();
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


  async checkChannel() {
    try {
      const res = await Pro.deploy.getConfiguration();
      this.deployChannel = res.channel;
      this.isBeta = (this.deployChannel === 'Beta')
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }
  }

  async toggleBeta() {
    const config = {
      channel: (this.isBeta ? 'Beta' : 'Master')
    }

    try {
      await Pro.deploy.configure(config);
      await this.checkChannel();
      await Pro.deploy.sync({updateMethod: 'background'}); // Alternatively, to customize how this works, use performManualUpdate()
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      Pro.monitoring.exception(err);
    }

  }

  async performManualUpdate() {

    /*
      Here we are going through each manual step of the update process:
      Check, Download, Extract, and Redirect.

      Ex: Check, Download, Extract when a user logs into your app,
        but Redirect when they logout for an app that is always running
        but used with multiple users (like at a doctors office).
    */

    try {
      const update = await Pro.deploy.checkForUpdate();

      if (update.available){
        this.downloadProgress = 0;

        await Pro.deploy.downloadUpdate((progress) => {
          this.downloadProgress = progress;
        })
        await Pro.deploy.extractUpdate();
        await Pro.deploy.reloadApp();
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }

  }

}
