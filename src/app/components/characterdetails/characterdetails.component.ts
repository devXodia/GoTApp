import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AudioserviceService } from '../../services/audioservice.service';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.scss',
})
export class CharacterdetailsComponent implements OnInit {
  characterName: string = '';
  name: any[] = [];
  charData: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public audio: AudioserviceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getName(params);
      this.fetchDetails();
    });
  }

  // This function stops the Audio
  stopAudio() {
    this.audio.audioPlaying = false;
    this.audio.stop();
  }

  //This function plays the Audio
  playAudio() {
    this.audio.audioPlaying = true;
    this.audio.play();
  }

  // This function fetches the Character Details from the API
  async fetchDetails() {
    try {
      let parameter = this.name[0].toLowerCase();
      const url = `https://api.gameofthronesquotes.xyz/v1/character/${parameter}`;
      let charDetails = await lastValueFrom(this.http.get(url));

      this.charData = charDetails;
    } catch (e) {
      return console.error(e);
    }
  }

  // This function gets the Name from the URL Parameter and checks if there are odd Character Names in the API and corrects them for the required API Call
  getName(params: any) {
    this.characterName = params['name'];
    if (this.characterName === 'Eddard "Ned" Stark') {
      this.characterName = 'Ned Stark';
    }
    if (this.characterName === 'Lord Varys') {
      this.characterName = 'Varys';
    }
    if (this.characterName === 'Petyr Baelish') {
      this.characterName = 'Baelish';
    }
    this.name = this.characterName.split(' ');
  }

  // This function routes the User to the desired House
  onHouseClick(houseName: string): void {
    this.router.navigate(['/house', houseName]);
  }
}
