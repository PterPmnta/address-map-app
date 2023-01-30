import { Component } from '@angular/core';
import { PlacesService } from '../../services/index.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService){}

  onQueryChange(txtQuery: string){

    if(this.debounceTimer){
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() =>{
      this.placesService.getPlacesByQuery(txtQuery);
    }, 500)

  }

}
