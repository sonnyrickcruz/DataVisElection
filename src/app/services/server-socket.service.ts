import { Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { VoteModel } from '../models/vote.model';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerSocketService {
  connected:boolean = false;
  stompSubscription = this._stompService.subscribe("/client/election")
  constructor(private _stompService: StompService) { }

  subscribe():Observable<string> {
    let result:Observable<string>;
    if (!this.connected) {
      result = this.stompSubscription.map((message: Message) => {
        return message.body;
      })
      this._stompService.publish("/app/connect", "");
      this.connected = true;
    }
    console.log(this.connected)
    return result;
    //this._stompService.publish("/app/connect", "");
  }
}
