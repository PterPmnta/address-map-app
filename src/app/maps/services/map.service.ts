import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: mapboxgl.Map;

  get isMapReady(){
    return !!this.map;
  }

  setMap(map: mapboxgl.Map){
    this.map = map;
  }

  flyTo(coords: mapboxgl.LngLatLike){
    if(!this.isMapReady){
      throw new Error('Map is not ready');
    }

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  constructor() { }
}
