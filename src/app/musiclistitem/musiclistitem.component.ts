import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicItem } from '../musicitem';
import { AudioService } from '../audio.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-musiclistitem',
  templateUrl: './musiclistitem.component.html',
  styleUrls: ['./musiclistitem.component.css']
})
export class MusiclistitemComponent implements OnInit {
  @Input() musicitem: MusicItem;
  @Input() currentMusicItem: MusicItem;
  @Output() outer = new EventEmitter<MusicItem>();
  @Output() outerCurrent = new EventEmitter<MusicItem>();

  constructor(private playerService: PlayerService,
    public audioService: AudioService) { }

  ngOnInit() {
  }

  delete(musicitem: MusicItem): void {
    this.outer.emit(musicitem);
  }

  toPlay(musicitem: MusicItem): void {
    this.playerService.playMusic(musicitem);
    this.outerCurrent.emit(this.playerService.getCurrentMusic());
  }
}
