import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'address-map-app';

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoicHRlcnBtbnRhbSIsImEiOiJjbDU1enVzY2Qwb2FuM2txZnh4dTBrcWJ1In0.W2ustO6xfGcz-kjaLp4Udw'
  }
}
