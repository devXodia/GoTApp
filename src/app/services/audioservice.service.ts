import { Injectable } from '@angular/core';
import * as Howler from 'howler';
@Injectable({
  providedIn: 'root',
})
export class AudioserviceService {
  public sound: Howler.Howl = new Howler.Howl({
    src: ['./assets/music/bg-music.mp3'], // Update with your file path
    loop: true,
    autoplay: true,
  });

  audioPlaying: boolean = true;

  constructor() {}

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.stop();
  }

  mute() {
    this.sound.mute();
  }
}
