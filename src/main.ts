import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (!navigator.geolocation) {
  alert('El navegador no soporta geocalizacion')
  throw new Error('Navegador no soporta geocalizacion');
}

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
