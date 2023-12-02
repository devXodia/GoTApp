import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AudioserviceService } from '../../services/audioservice.service';

@Component({
  selector: 'app-housedetails',
  templateUrl: './housedetails.component.html',
  styleUrl: './housedetails.component.scss',
})
export class HousedetailsComponent {
  houseName: string = '';
  house: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public audio: AudioserviceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getHouseName(params);
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

  // This function fetches the Details of the selected House
  async fetchDetails() {
    try {
      let parameter = this.house[1].toLowerCase();
      const url = `https://api.gameofthronesquotes.xyz/v1/house/${parameter}`;
      let houseDetails = await lastValueFrom(this.http.get(url));
      this.house = houseDetails;
    } catch (e) {
      return console.error(e);
    }
  }

  // This function gets the House Name from the URL Parameter
  getHouseName(params: any) {
    this.houseName = params['house'];
    this.house = this.houseName.split(' ');
  }

  // This Function routes the User to the desired Member
  onMemberClick(memberName: string): void {
    this.router.navigate(['/character', memberName]);
  }
}
