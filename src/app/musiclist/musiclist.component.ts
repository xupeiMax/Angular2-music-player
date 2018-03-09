import { Component, OnInit } from '@angular/core';
import { MusicItem } from '../musicitem';
import { PlayerService } from '../player.service';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-musiclist',
  templateUrl: './musiclist.component.html',
  styleUrls: ['./musiclist.component.css']
})
export class MusiclistComponent implements OnInit {
  musiclist: MusicItem[];
  currentMusicItem: MusicItem;
  constructor(private playerService: PlayerService,
    public audioService: AudioService) { }

  ngOnInit() {
    this.getMusicList();
    this.getCurrentPlay();
  }

  getMusicList(): void {
    this.playerService.getMusiclist().subscribe(musiclist => this.musiclist = musiclist);
  }

  getCurrentPlay(): void {
    this.currentMusicItem = this.playerService.getCurrentMusic();
  }

  delete(musicitem: MusicItem): void {
    // view 层删除
    this.musiclist = this.musiclist.filter(h => h !== musicitem);
    // 服务器 请求删除
    // this.playerService.deleteMusic(musicitem).subscribe();
  }
  changeCurrent(musicitem: MusicItem): void {
    this.currentMusicItem = musicitem;
  }

}
