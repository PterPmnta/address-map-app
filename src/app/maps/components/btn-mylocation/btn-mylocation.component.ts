import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services/index.service';

@Component({
  selector: 'app-btn-mylocation',
  templateUrl: './btn-mylocation.component.html',
  styleUrls: ['./btn-mylocation.component.css']
})
export class BtnMylocationComponent {

  constructor(private mapService: MapService,
              private placesService: PlacesService){}

  goToMyLocation(){

    if(!this.placesService.isUserLocationReady){
      throw Error('No hay geocalizacion del usuario');
    }

    if(!this.mapService.isMapReady){
      throw Error('El mapa no esta inicializado');
    }

    this.mapService.flyTo(this.placesService.userLocation!)
  }

}
