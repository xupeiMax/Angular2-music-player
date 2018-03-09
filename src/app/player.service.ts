import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MusicItem } from './musicitem';
import { MUSIC_LIST } from './mock-musiclist';
import { AudioService } from './audio.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PlayerService {
  // 服务器地址
  private services = 'api/musicitemlist';
  constructor(private http: HttpClient,
    private audioService: AudioService) { }
  getMusiclist(): Observable<MusicItem[]> {
    return of(MUSIC_LIST);
  }
  formatTime(time) {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    const result = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    return result === 'NaN:NaN' ? '0:00' : result;
  }
  getMusicIndex(musicitem) {
    return MUSIC_LIST.indexOf(musicitem);
  }

  getCurrentMusic() {
    const index = this.audioService.PlayData().Index;
    return MUSIC_LIST[index];
  }

  deleteMusic(musicitem: MusicItem | number): Observable<MusicItem> {
    const id = typeof musicitem === 'number' ? musicitem : musicitem.id;
    const url = `${this.services}/${id}`;

    return this.http.delete<MusicItem>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted musicitem id=${id}`)),
      catchError(this.handleError<MusicItem>('deleteMusicItem'))
    );
  }

  playMusic(musicitem: MusicItem): void {
    this.audioService.currentPlay(this.getMusicIndex(musicitem));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
