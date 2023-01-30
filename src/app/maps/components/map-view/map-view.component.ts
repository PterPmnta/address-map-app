import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesService, MapService } from '../../services/index.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements OnInit, AfterViewInit {

  @ViewChild('mapcontainer') mapContainer!: ElementRef;
  mapa!: mapboxgl.Map;
  mapStyle: string = 'mapbox://styles/mapbox/light-v10';

  constructor(private placesService: PlacesService,
              private mapService: MapService){}

  ngOnInit(){
    console.log(this.placesService.userLocation);
  }

  ngAfterViewInit(): void {

    if(!this.placesService.userLocation){
      throw Error('No hay geocalizacion para mostrar en el mapa');
    }

    this.mapa = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: this.mapStyle,
      center: this.placesService.userLocation,
      zoom: 12,
    });

    const popUp = new mapboxgl.Popup()
      .setHTML(
        `
          <h6>Aqui estoy</h6>
          <span>En este lugar del mundo</span>
          <p>${this.placesService.userLocation}</p>
        `
      )

    new mapboxgl.Marker({color: 'red'})
        .setLngLat(this.placesService.userLocation)
        .setPopup(popUp)
        .addTo(this.mapa)

    this.mapService.setMap(this.mapa);
  }

}
