import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import registerLocaleData and the Spanish locale data
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';

// Register the Spanish locale data
registerLocaleData(localeEsMx, 'es-MX');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
