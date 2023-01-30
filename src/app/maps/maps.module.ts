import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMylocationComponent } from './components/btn-mylocation/btn-mylocation.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';



@NgModule({
  declarations: [
    MapScreenComponent,
    MapViewComponent,
    LoadingComponent,
    BtnMylocationComponent,
    AngularLogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapScreenComponent
  ],
})
export class MapsModule { }
