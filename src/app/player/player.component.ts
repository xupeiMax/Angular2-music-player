import { Component, OnInit, Input} from '@angular/core';

import { MusicItem } from '../musicitem';
import { PlayerService } from '../player.service';
import { AudioService } from '../audio.service';
import { PlayData } from '../play-data.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  repeat: string[];
  musiclist: MusicItem[];
  currentMusicItem: MusicItem;
  data: PlayData;
  progress: number;
  volume: number;
  leftTime: string;
  isPlay: boolean;

  constructor(private playerService: PlayerService,
  public audioService: AudioService) { }

  ngOnInit() {
    this.repeat = ['cycle', 'once', 'random'];
    this.progress = 0;
    this.volume = 50;
    this.getMusicList();
    this.getCurrentPlay();
    this.getPlayData();
  }
  getCurrentPlay(): void {
    this.currentMusicItem = this.playerService.getCurrentMusic();
  }

  getPlayData(): void {
    const that = this;
    that.audioService.TimeUpdata(function(res){
      that.data = res;
      that.leftTime = that.playerService.formatTime(res.During - res.Current);
      that.progress = Math.floor((res.Current / res.During) * 100);
      that.isPlay = res.IsPlaying;
      that.currentMusicItem = that.musiclist[res.Index];
      if ((res.Current / res.During) > 0.995) {
        that.playAutoNext();
      }
    });
  }

  play(currentMusicItem: MusicItem): void {
    this.audioService.Toggle(currentMusicItem);
  }


  getMusicList(): void {
    this.playerService.getMusiclist().subscribe(musiclist => this.musiclist = musiclist);
  }

  receive(progress: number): void {
    this.progress = progress * 100;
    if (!this.isPlay) {
      this.audioService.Toggle(this.currentMusicItem);
    }
    this.skip(progress);
  }

  skip(p): void {
    this.audioService.Skip(p);
  }

  volumeHandler(volume: number): void {
    this.volume = volume * 100;
    this.audioService.ChangeVolume(volume);
  }

  playOrPause(): void {
    this.isPlay = !this.isPlay;
    this.audioService.Toggle(this.currentMusicItem);
  }

  playAutoNext(): void {
    const index: number = this.playerService.getMusicIndex(this.currentMusicItem);
    let newIndex: number = null;
    const musicListLength: number = this.musiclist.length;
    switch (this.repeat[0]) {
      case 'cycle':
        newIndex = (index + 1) % musicListLength;
        break;
      case 'once':
        newIndex = index;
        break;
      case 'random':
        do {
          newIndex = Math.floor(Math.random() * musicListLength);
        } while (newIndex === index);
        break;
      default:
        newIndex = (index + 1) % musicListLength;
        break;
    }
    this.currentMusicItem = this.musiclist[newIndex];
    this.playerService.playMusic(this.currentMusicItem);
  }

  playNext(type: string): void {
    const index: number = this.playerService.getMusicIndex(this.currentMusicItem);
    let newIndex: number = null;
    const musicListLength: number = this.musiclist.length;
    switch (type) {
      case 'next':
        switch (this.repeat[0]) {
          case 'random':
            do {
              newIndex = Math.floor(Math.random() * musicListLength);
            } while (newIndex === index);
          break;
          default:
            newIndex = (index + 1) % musicListLength;
          break;
        }
        this.currentMusicItem = this.musiclist[newIndex];
        this.playerService.playMusic(this.currentMusicItem);
        // this.audioService.Next();
        break;
      case 'prev':
        newIndex = (index - 1 + musicListLength) % musicListLength;
        this.currentMusicItem = this.musiclist[newIndex];
        this.playerService.playMusic(this.currentMusicItem);
        // this.audioService.Prev();
        break;
      default:
        newIndex = (index - 1 + musicListLength) % musicListLength;
        this.currentMusicItem = this.musiclist[newIndex];
        this.audioService.Prev();
        break;
    }
    if (!this.isPlay) {
      this.isPlay = true;
    }
  }

  repeatStyle(): void {
    this.repeat.push(this.repeat.shift());
  }

}
