import {Injectable} from '@angular/core';
import {ChatMessageDto} from "../models/chatMessageDto";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // @ts-ignore
  webSocket: WebSocket;
  chatMessage: ChatMessageDto[] = [];

  constructor() {
  }

  public openWebSocket() {
    this.webSocket = new WebSocket("ws://localhost:8080/chat");
    this.webSocket.onopen = (event) => {
      console.log("Open: " + event);
    }

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessage.push(chatMessageDto);
    }

    this.webSocket.onclose = (event) => {
      console.log("Close: " + event);
    }
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
