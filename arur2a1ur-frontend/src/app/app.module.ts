import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { AruAppComponent } from './components/aru-app/aru-app.component';
import { AruAppResetComponent } from './components/aru-app-reset/aru-app-reset.component';
import { AruAppFinishComponent } from './components/aru-app-finish/aru-app-finish.component';
import { AruAppStartComponent } from './components/aru-app-start/aru-app-start.component';
import { AruAppMandrelEjectionComponent } from './components/aru-app-mandrel-ejection/aru-app-mandrel-ejection.component';
import { AruAppSupplyComponent } from './components/aru-app-supply/aru-app-supply.component';
import { AruAppCheckComponent } from './components/aru-app-check/aru-app-check.component';
import { AruPgResetComponent } from './components/aru-pg-reset/aru-pg-reset.component';
import { AruPgFinishComponent } from './components/aru-pg-finish/aru-pg-finish.component';
import { AruPgRivetingStartComponent } from './components/aru-pg-riveting-start/aru-pg-riveting-start.component';
import { AruPgMandrelEjectionComponent } from './components/aru-pg-mandrel-ejection/aru-pg-mandrel-ejection.component';
import { AruPgRivetSupplyComponent } from './components/aru-pg-rivet-supply/aru-pg-rivet-supply.component';
import { AruPgCheckComponent } from './components/aru-pg-check/aru-pg-check.component';

import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
      { prefix: PATH + '/assets/i18n/', suffix: '.json' },
      { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({

  declarations: [
      AruAppComponent,
      AruPgResetComponent,
      AruPgFinishComponent,
      AruPgRivetingStartComponent,
      AruPgMandrelEjectionComponent,
      AruPgRivetSupplyComponent,
      AruPgCheckComponent,
],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      UIAngularComponentsModule,
      FormsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
        defaultLanguage: 'en',  // set fallback language to english
        useDefaultLang: true,   // start with default language
      }),
      // inport aru-app-* standalone components
      AruAppResetComponent,
      AruAppFinishComponent,
      AruAppStartComponent,
      AruAppMandrelEjectionComponent,
      AruAppSupplyComponent,
      AruAppCheckComponent
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const aruappComponent = createCustomElement(AruAppComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-app', aruappComponent);
    const arupgresetComponent = createCustomElement(AruPgResetComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-pg-reset', arupgresetComponent);
    const arupgfinishComponent = createCustomElement(AruPgFinishComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-pg-finish', arupgfinishComponent);
    const arupgrivetingstartComponent = createCustomElement(AruPgRivetingStartComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-pg-riveting-start', arupgrivetingstartComponent);
    const arupgmandrelejectionComponent = createCustomElement(AruPgMandrelEjectionComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-pg-mandrel-ejection', arupgmandrelejectionComponent);
    const arupgrivetsupplyComponent = createCustomElement(AruPgRivetSupplyComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-pg-rivet-supply', arupgrivetsupplyComponent);
    const arupgcheckComponent = createCustomElement(AruPgCheckComponent, {injector: this.injector});
    customElements.define('lobtex-arur2a1ur-aru-pg-check', arupgcheckComponent);
  }

  // This function is never called, because we don't want to actually use the workers, just tell webpack about them
  registerWorkersWithWebPack() {
    new Worker(new URL('./components/aru-app/aru-app.behavior.worker.ts'
        /* webpackChunkName: "aru-app.worker" */, import.meta.url), {
      name: 'aru-app',
      type: 'module'
    });
    new Worker(new URL('./components/aru-pg-reset/aru-pg-reset.behavior.worker.ts'
        /* webpackChunkName: "aru-pg-reset.worker" */, import.meta.url), {
      name: 'aru-pg-reset',
      type: 'module'
    });
    new Worker(new URL('./components/aru-pg-finish/aru-pg-finish.behavior.worker.ts'
        /* webpackChunkName: "aru-pg-finish.worker" */, import.meta.url), {
      name: 'aru-pg-finish',
      type: 'module'
    });
    new Worker(new URL('./components/aru-pg-riveting-start/aru-pg-riveting-start.behavior.worker.ts'
        /* webpackChunkName: "aru-pg-riveting-start.worker" */, import.meta.url), {
      name: 'aru-pg-riveting-start',
      type: 'module'
    });
    new Worker(new URL('./components/aru-pg-mandrel-ejection/aru-pg-mandrel-ejection.behavior.worker.ts'
        /* webpackChunkName: "aru-pg-mandrel-ejection.worker" */, import.meta.url), {
      name: 'aru-pg-mandrel-ejection',
      type: 'module'
    });
    new Worker(new URL('./components/aru-pg-rivet-supply/aru-pg-rivet-supply.behavior.worker.ts'
        /* webpackChunkName: "aru-pg-rivet-supply.worker" */, import.meta.url), {
      name: 'aru-pg-rivet-supply',
      type: 'module'
    });
    new Worker(new URL('./components/aru-pg-check/aru-pg-check.behavior.worker.ts'
        /* webpackChunkName: "aru-pg-check.worker" */, import.meta.url), {
      name: 'aru-pg-check',
      type: 'module'
    });
  }
}

