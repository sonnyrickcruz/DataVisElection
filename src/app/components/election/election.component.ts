import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { VoteModel } from '../../models/vote.model';
import { VotesSummaryModel } from '../../models/votes-summary.model';
import { ServerSocketService } from '../../services/server-socket.service'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  votesSummary: VotesSummaryModel[];
  totalVotes: number;

  constructor(private _serverSocket: ServerSocketService) { }

  ngOnInit() {
    let subscription = this._serverSocket.subscribe();
    subscription.subscribe((body: string) => {
      this.votesSummary = [];
      this.totalVotes = 0;
      let result = JSON.parse(body);
      for(let key of Object.keys(result)) {
        this.votesSummary.push(result[key]);
        this.totalVotes = this.totalVotes + result[key].voteCount;
      }
    })
  }
  
  getPercentage(votes:number) {
    return (votes/this.totalVotes)*100;
  }
  
}
