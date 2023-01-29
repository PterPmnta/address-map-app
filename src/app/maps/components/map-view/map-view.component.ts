import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/index.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements OnInit {

  constructor(private placesService: PlacesService){}

  ngOnInit(){
    console.log(this.placesService.userLocation);
  }

}
