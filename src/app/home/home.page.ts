import { Component } from '@angular/core';
import { PostPage } from '../post/post.page';
import {NavController, AlertController, Platform} from '@ionic/angular';
import {GetPostService} from '../get-post.service';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';



// var WPAPI = require( 'wpapi' );
import WPAPI from 'wpapi';
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	// public items: Array<{  id: number; title: string; image: string; date: string }> = [];
	public posts: Array<{  id: number; title: string; category: string; content: string; image: string; date: string; link: string }> = [];
	public morePagesAvailable: Boolean;
	private page: number = 1;
	private image: any;
	private categoryId: any;
	public pageTitle: any;

	constructor( public fb: Facebook, public platform: Platform, public alertController: AlertController, private socialSharing: SocialSharing, private route: ActivatedRoute, public navCtrl: NavController, private getPostService: GetPostService){
		this.categoryId = this.route.snapshot.paramMap.get('id');
		
		let arrayTitle = [
		{id: null, title: 'Khmer News Live 24'},
		{id: 2, title: 'ពត៌មាន Live'},
		{id: 3, title: 'សិល្បះ & កំសាន្ត'},
		{id: 4, title: 'សុខភាព & ជីវិត'},
		{id: 1, title: 'យល់ដឹង'},
		{id: 6, title: 'ប្លែកៗ'},
		{id: 16, title: 'កីឡា'},
		{id: 17, title: 'បច្ចេកវិទ្យា'}
		];

		for (let i = 0; i < arrayTitle.length; i ++){
			if (this.categoryId == arrayTitle[i]['id']){
				this.pageTitle = arrayTitle[i]['title'];
			}
		}
		
		this.posts = [];
		this.getPostService.refresh(this.categoryId).then((posts) => {
			for(let post of posts){
				this.posts.push(post);
			}
		});

		this.image = {
	    	defaultImage: '',
	    	offset: 100
	    }

	    
	}

	

	async presentAlert(header, msg) {
		const alert = await this.alertController.create({
			header: header,
			message: msg,
			buttons: ['OK']
		});

		await alert.present();
	}

	async loginFacebook(){

		// Login with permissions
		this.fb.login(['public_profile', 'email'])
		.then( (res: FacebookLoginResponse) => {

			// The connection was successful
			if(res.status == "connected") {

				// Get user ID and Token
				var fb_id = res.authResponse.userID;
				var fb_token = res.authResponse.accessToken;

				// Get user infos from the API
				this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

					// Get the connected user details
					var gender    = user.gender;

					var name      = user.name;
					var email     = user.email;

					console.log("=== USER INFOS ===");
					console.log("Gender : " + gender);
					
					console.log("Name : " + name);
					console.log("Email : " + email);

					// => Open user session and redirect to the next page

				});

			} 
			// An error occurred while loging-in
			else {

				console.log("An error occurred...");

			}

		})
		.catch((e) => {
			console.log('Error logging into Facebook', e);
		});

	}



	ngOnInit() {
		
	}

	async shareFacebook(post){
		let appName = 'facebook';
		if (this.platform.is('ios')) {
	     	appName = 'com.apple.social.facebook'
	    }
		
		this.socialSharing.shareViaFacebook(post.title, null, post.link).then(() => {
			
		}).catch((msg) => {
			this.presentAlert('Error shareViaFacebook!', msg);
		});
		

	}

	ionViewDidEnter() {
		this.morePagesAvailable = true;
	}

	doRefresh(refresher){
		this.page = 1;
		this.posts = [];
		this.getPostService.refresh(this.categoryId).then((posts) => {
			for(let post of posts){
				this.posts.push(post);
			}
			refresher.target.complete();
		});		
	}

	doInfinite(infiniteScroll) {
		let loading = true;
		let posts = [];

		this.page++;

		this.getPostService.getPosts(this.page, this.categoryId).then((posts) => {
			
			for(let post of posts){
				

				if(!loading){
					infiniteScroll.target.complete();
				}

				this.posts.push(post);
				loading = false;
			}
		});

		
	}

	goPost(){
		this.navCtrl.navigateForward('/post/');

	}
}
