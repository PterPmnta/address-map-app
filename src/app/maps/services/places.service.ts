import { Injectable } from '@angular/core';
import { Feature, IPlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './index.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation : [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private placesApi: PlacesApiClient,
              private mapService: MapService) {
    this.getUserLocation();
  }

  getUserLocation():Promise<[number, number]>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        },
        (err) => {
          alert('No se pudo obtener la geocalizacion');
          console.log(err);
          reject();
        }
      )
    })
  }

  getPlacesByQuery(query:string = ''){

    if(query.length === 0){
      this.places = [];
      return;
    }

    if(!this.userLocation){
      throw Error('No se pudo obtener la geocalizacion');
    }

    this.isLoadingPlaces = true;

    this.placesApi.get<IPlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe((resp)=>{
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkerFromPlaces(resp.features)
      })

  }
}
