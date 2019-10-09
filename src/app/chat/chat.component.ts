import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SocketsService } from '../services/sockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ioConnection: any;
  messageData: string = '';
  name = localStorage.getItem('username');
  valid = false;

  msgList:any;
	groupList:any;
  channelList:any;
  
  constructor(private socket:SocketsService, private data:DataService) { }

  //emitting socket to say joined chat
  async messageList(CID){
    this.msgList = await this.data.messages(CID);
    localStorage.setItem('channelID', CID);
  }
//
  async sendChat(){
    if(this.messageData){
      const today = new Date;
      const time = today.getHours() + ":" + today.getMinutes();
      const CID = parseInt(localStorage.getItem('channelID'));

      const msg = { time: time, user: this.name, body: this.messageData, CID: CID };
      //send typed message for socket service to deal with
      this.socket.chat(msg);

      //clear message cache to be ready for next message
      this.messageData=null
    }
  }



  async ngOnInit() {
    //await 
    //this.ioConnection = await this.socketservice.onMessage();

    this.valid = this.data.validateUser();
    if (this.valid){
      this.socket.initSocket();
      this.ioConnection = await this.socket.onMessage().subscribe((message:any) => {
        if (message.CID == parseInt(localStorage.getItem('channelID'))){
          this.msgList.push(message);
        }
      });

      //fetching all groups that user is part of to display in chat sidebar
      this.groupList = await this.data.groupData();

      //fetching all channels that user is part of to display in chat sidebar
      this.channelList = await this.data.channelData(this.name);
      console.log(this.channelList);
    }
  }

}
