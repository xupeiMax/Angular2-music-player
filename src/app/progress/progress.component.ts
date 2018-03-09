import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() progress: number;
  @Input() barColor: string = '#2f9842';
  @Output() outer = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  progressChange(e): void {
    this.outer.emit((e.clientX - e.target.getBoundingClientRect().left) / e.target.clientWidth);
  }
}
