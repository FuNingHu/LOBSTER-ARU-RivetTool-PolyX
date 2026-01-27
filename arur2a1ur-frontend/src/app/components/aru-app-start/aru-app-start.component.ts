import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-aru-app-start',
  imports: [CommonModule, TranslateModule],
  templateUrl: './aru-app-start.component.html',
  styleUrl: './aru-app-start.component.scss'
})
export class AruAppStartComponent implements OnChanges {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;

  constructor(
    protected readonly translateService: TranslateService,
    protected readonly cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.robotSettings) {
      if (!changes?.robotSettings?.currentValue) return;
      if (changes?.robotSettings?.isFirstChange()) {
        if (changes?.robotSettings?.currentValue) {
          this.translateService.use(changes?.robotSettings?.currentValue?.language);
        }
        this.translateService.setDefaultLang('en');
      }
      this.translateService
        .use(changes?.robotSettings?.currentValue?.language)
        .pipe(first())
        .subscribe(() => this.cd.detectChanges());
    }
  }
}
