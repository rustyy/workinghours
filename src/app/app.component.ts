import { ApplicationRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { SwUpdate } from '@angular/service-worker';
import { OnInit } from '@angular/core';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'workinghours';
  updatesAvailable = false;
  updates;

  constructor(appRef: ApplicationRef, updates: SwUpdate, private translate: TranslateService) {
    this.initI18n();
    this.updates = updates;

    if (this.updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const checkUpdateInterval$ = interval(2 * 60 * 1000);
      const checkUpdates = concat(appIsStable$, checkUpdateInterval$);
      checkUpdates.subscribe(() => updates.checkForUpdate());
    }
  }

  ngOnInit() {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe(event => {
        this.updatesAvailable = true;
      });
    }
  }

  initI18n() {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
