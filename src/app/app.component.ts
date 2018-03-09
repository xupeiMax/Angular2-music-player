import { Component, OnInit } from '@angular/core';

import { MusicItem } from './musicitem';
import { PlayerService } from './player.service';
import { AudioService } from './audio.service';
import { PlayData } from './play-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular2';
  musiclist: MusicItem[];

  constructor(private playerService: PlayerService,
    public audioService: AudioService) { }

  ngOnInit() {
    this.getMusicList();
    this.setPlayList();
  }

  setPlayList(): void {
    const that = this;
    this.musiclist.forEach((item) => {
      that.audioService.Add(item);
    });
  }

  getMusicList(): void {
    this.playerService.getMusiclist().subscribe(musiclist => this.musiclist = musiclist);
  }

}
