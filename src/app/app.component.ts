import { ApplicationRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { useAnimation, transition, trigger } from '@angular/animations';
import { pageToPage } from './shared/animations/pageToPage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('routeAnimations', [transition('* <=> closable', [useAnimation(pageToPage)])])],
})
export class AppComponent implements OnInit {
  title = 'workinghours';
  updatesAvailable = false;

  constructor(private appRef: ApplicationRef, private updates: SwUpdate, private translate: TranslateService) {
    this.initI18n();
    this.checkForUpdate();
  }

  ngOnInit() {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe((event) => {
        this.updatesAvailable = true;
      });
    }
  }

  checkForUpdate() {
    if (this.updates.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true));
      const checkUpdateInterval$ = interval(2 * 60 * 1000);
      const checkUpdates = concat(appIsStable$, checkUpdateInterval$);
      checkUpdates.subscribe(() => this.updates.checkForUpdate());
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
