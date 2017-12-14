import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { VoteModel } from '../../models/vote.model';
import { VotesSummaryModel } from '../../models/votes-summary.model';
import { ServerSocketService } from '../../services/server-socket.service'
import 'rxjs/add/operator/map'
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  votesSummary: VotesSummaryModel[] = [];
  totalVotes: number;
  objectKeys;
  mapDisplay = {};

  constructor(private _serverSocket: ServerSocketService) { }

  ngOnInit() {
    let subscription = this._serverSocket.subscribe();
    let isInit = false;
    subscription.subscribe((body: string) => {
      this.totalVotes = 0;
      let result = JSON.parse(body);
      if (!isInit) {
        this.initBoard(result)
      }
      for (let key of this.objectKeys) {
        this.mapDisplay[key].voteCount = result[key].voteCount;
        this.totalVotes += result[key].voteCount;
      }
      isInit = true;
    })
  }

  initBoard(result) {
    this.objectKeys = Object.keys(result);
    this.mapDisplay = result;
  }

  getPercentage(votes) {
    return (parseInt(votes.voteCount) / this.totalVotes) * 100;
  }

}
