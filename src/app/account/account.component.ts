import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

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

	async ngOnInit() {
		this.userData = await this.data.userAcc(this.username); 
		this.email = this.userData.email;
	}

}
