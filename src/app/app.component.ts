import { Component } from '@angular/core';
import * as Howler from 'howler';
import { AudioserviceService } from './services/audioservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-of-thrones';

  ngOnInit(): void {}
  constructor(private audio: AudioserviceService) {}
}
