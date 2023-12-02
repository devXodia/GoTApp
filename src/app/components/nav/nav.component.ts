import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AudioserviceService } from '../../services/audioservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  houseData: any;
  charData: any;
  randomQuotes: any;
  houseSearch: string = '';
  foundHouses: any;
  foundPersons: any;
  personSearch: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public audio: AudioserviceService
  ) {}

  ngOnInit(): void {
    this.fetchHouses();
    this.fetchCharacters();
    this.fetchRandomQuotes();
  }

  ngOnDestroy() {}

  //This function stops the Audio
  stopAudio() {
    this.audio.audioPlaying = false;
    this.audio.stop();
  }

  //This function plays the Audio
  playAudio() {
    this.audio.audioPlaying = true;
    this.audio.play();
  }

  // This function routes the User to the desired Character
  onCharacterClick(characterName: string): void {
    this.router.navigate(['/character', characterName]);
  }

  // This function routes the User to the desired House
  onHouseClick(houseName: string): void {
    this.router.navigate(['/house', houseName]);
  }

  // This function fetches the House Data from the API
  async fetchHouses() {
    try {
      const url = 'https://api.gameofthronesquotes.xyz/v1/houses';
      let housesData = await lastValueFrom(this.http.get(url));
      this.houseData = housesData;
      this.foundHouses = housesData;
    } catch (e) {
      return console.error(e);
    }
  }

  // This function fetches the Characters Data from the API
  async fetchCharacters() {
    try {
      const url = 'https://api.gameofthronesquotes.xyz/v1/characters';
      let characters = await lastValueFrom(this.http.get(url));
      this.charData = characters;
      this.foundPersons = characters;
    } catch (e) {
      return console.error(e);
    }
  }

  // This function fetches the Quotes Data from the API
  async fetchRandomQuotes() {
    try {
      const url = 'https://api.gameofthronesquotes.xyz/v1/random/5';
      let quotes = await lastValueFrom(this.http.get(url));
      this.randomQuotes = quotes;
    } catch (e) {
      return console.error(e);
    }
  }

  // This function is responsible for the Search function from the available Houses
  onSearchHouse(event: Event) {
    this.foundHouses = [];
    const input = (event.target as HTMLInputElement).value;
    this.houseData.forEach((house: any) => {
      if (house.name.toLowerCase().includes(input.toLowerCase())) {
        this.foundHouses.push(house);
      }
    });
    if (input.length === 0) {
      this.foundHouses = this.houseData;
    }
  }

  // This function is responsible for the Search function from the available Persons
  onSearchPerson(event: Event) {
    this.foundPersons = [];
    const input = (event.target as HTMLInputElement).value;
    this.charData.forEach((char: any) => {
      if (char.name.toLowerCase().includes(input.toLowerCase())) {
        this.foundPersons.push(char);
      }
    });
    if (input.length === 0) {
      this.foundPersons = this.charData;
    }
  }
}
