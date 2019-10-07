import { Component, OnInit } from '@angular/core';
import { Message } from '../mesage';
import { SocketsService } from '../service/sockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  ioConnection: any;
  messageData: string = "";

  constructor(private socketservice:SocketsService) { }

  async ngOnInit() {
    await this.socketservice.initSocket();
    this.ioConnection = await this.socketservice.onMessage();

  }

}
