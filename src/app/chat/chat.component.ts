import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SocketsService } from '../services/sockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ////////////////////
  //Global variables//
  ////////////////////
  ioConnection: any;
  messageData: string = '';
  name = localStorage.getItem('username');
  valid = false;
  channelChat = false;
  cname = "";
  gname = '';

  msgList:any; //will contain list of all messages
	groupList:any; //will contain list of all groups
  channelList:any; //will contain list of all channels user is in
  
  constructor(private socket:SocketsService, private data:DataService) { }

  //emitting socket to say joined chat
  async messageList(CID){
    this.msgList = await this.data.messages(CID);
    localStorage.setItem('channelID', CID);
    this.channelChat = true; //allowing group and channels names to be displayed
    //finding current channel name
    for( let i = 0; i < this.channelList.length; i++){
      if (this.channelList[i].CID === CID){
        this.cname = this.channelList[i].name;
        this.gname = this.channelList[i].group;
        console.log(this.channelList[i].name);
      } 
    }
    
  }

//emitting massage typed in chat textbox
  async sendChat(){
    if(this.messageData){
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes();
      const CID = parseInt(localStorage.getItem('channelID'));

      const msg = { time: time, UID: this.name, body: this.messageData, CID: CID };
      //send typed message for socket service to deal with
      this.socket.chat(msg);

      //clear message cache to be ready for next message
      this.messageData=null
    }
  }



  async ngOnInit() {
    //performing validation check to see if user is logged in 
    this.valid = this.data.validateUser();
    if (this.valid){
      this.socket.initSocket();
      //if user is validly logged in, listens for messages being sent or received to update chat
      this.ioConnection = await this.socket.onMessage().subscribe((message:any) => {
        if (message.CID === parseInt(localStorage.getItem('channelID'))){
          this.msgList.push(message);
        }
      });

      // fetching all groups that user is part of to display in chat sidebar
      this.groupList = await this.data.groupData();

      // fetching all channels that user is part of to display in chat sidebar
      this.channelList = await this.data.channelData(this.name);
      console.log(this.channelList);
    }
  }

}
