import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  get isMapReady(){
    return !!this.map;
  }

  constructor() { }

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

  createMarkerFromPlaces(places: Feature[], userLocation: [number, number]){

    if(!this.map){
      throw Error('Map is not ready');
    }

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for(const place of places){
      const [lng, lat] = place.center;
      const popup = new mapboxgl.Popup()
        .setHTML(
          `
            <h6>${place.text}</h6>
            <span>${place.place_name}</span>
          `
        );

      const newMarker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map)

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if(places.length === 0){
      return;
    }

    const bounds = new mapboxgl.LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200
    });

  }

}
