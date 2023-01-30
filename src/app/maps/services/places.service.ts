import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, IPlacesResponse } from '../interfaces/places.interface';

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

  constructor(private http: HttpClient) {
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

    this.isLoadingPlaces = true;

    this.http.get<IPlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=4&proximity=-73.990593, 40.740121&language=es&access_token=pk.eyJ1IjoicHRlcnBtbnRhbSIsImEiOiJjbDU1enVzY2Qwb2FuM2txZnh4dTBrcWJ1In0.W2ustO6xfGcz-kjaLp4Udw`)
      .subscribe((resp)=>{
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      })

  }
}
