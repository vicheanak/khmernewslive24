import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GetPostService } from '../get-post.service';
import {AlertController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

	public post;
	public image: any;

	constructor(private socialSharing: SocialSharing, public alertController: AlertController, private route: ActivatedRoute, private getPostService: GetPostService) { 



	}

	async presentAlert(header, msg) {
		const alert = await this.alertController.create({
			header: header,
			message: msg,
			buttons: ['OK']
		});

		await alert.present();
	}

	async shareFacebook(post){
		
		this.socialSharing.shareViaFacebook(post.title, null, post.link).then(() => {
			
		}).catch((msg) => {
			this.presentAlert('Error shareViaFacebook!', msg);
		});
		

	}
	ionViewWillEnter(){
		let postId = this.route.snapshot.paramMap.get('id');

		this.post = this.getPostService.getPost(postId);
		this.image = {
			defaultImage: 'https://www.placecage.com/1000/1000',
			offset: 100
		}


		
	}
	ngOnInit() {

	}

}
