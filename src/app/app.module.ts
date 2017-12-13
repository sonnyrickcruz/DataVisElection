import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StompConfig, StompService } from '@stomp/ng2-stompjs'

import { AppComponent } from './app.component';
import { ElectionComponent } from './components/election/election.component';
import { TestComponent } from './components/test/test.component';

import { ServerSocketService } from './services/server-socket.service'

const routes: Routes = [
  { path: "election", component: ElectionComponent },
  { path: "test", component: TestComponent },
  { path: "", redirectTo: "/election", pathMatch: 'full'}
]

const stompConfig: StompConfig = {
  url: 'ws://localhost:8080/ws/websocket',
  // Typical keys: login, passcode, host
  headers: {
    login: "",
    passcode: ""
  },
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: false
};

@NgModule({
  declarations: [
    AppComponent,
    ElectionComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ServerSocketService,
    StompService, 
    {
      provide: StompConfig,
      useValue: stompConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
