import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Register Portuguese locale data used by CurrencyPipe and other i18n pipes
registerLocaleData(localePt, 'pt');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
