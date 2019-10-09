import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	constructor(private data: DataService) { }

	email="";
	username = localStorage.getItem("username");
	
	userData: any;
	groupList: any;
	channelList: any;

	async ngOnInit() {

		//fetching user data to display
		this.userData = await this.data.userAcc(this.username); 
		this.email = this.userData.email;

		//fetching groups
		this.groupList = await this.data.groupData();
		console.log(this.groupList);

		//fetching channels that this user is in
		this.channelList = await this.data.channelData(this.username);
		console.log(this.channelList);
	}

}
