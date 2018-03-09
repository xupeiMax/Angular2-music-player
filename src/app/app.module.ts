import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { MusiclistComponent } from './musiclist/musiclist.component';
import { MusiclistitemComponent } from './musiclistitem/musiclistitem.component';
import { ProgressComponent } from './progress/progress.component';
import { PlayerComponent } from './player/player.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlayerService } from './player.service';
import { AudioService } from './audio.service';


@NgModule({
  declarations: [
    AppComponent,
    MusiclistComponent,
    MusiclistitemComponent,
    ProgressComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [PlayerService, AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
