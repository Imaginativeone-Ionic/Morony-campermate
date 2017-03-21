import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Storage } from '@ionic/storage';

// Pages
import { HomePage }        from '../pages/home/home';
import { LocationPage }    from '../pages/location/location';
import { MyDetailsPage }   from '../pages/my-details/my-details';
import { CampDetailsPage } from '../pages/camp-details/camp-details';

// Providers
import { GoogleMaps }   from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { GoogleMaps }   from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
