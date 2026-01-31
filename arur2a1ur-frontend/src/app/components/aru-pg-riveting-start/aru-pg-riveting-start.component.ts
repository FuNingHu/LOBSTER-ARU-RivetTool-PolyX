import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramPresenter, ProgramPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruPgRivetingStartNode } from './aru-pg-riveting-start.node';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './aru-pg-riveting-start.component.html',
    styleUrls: ['./aru-pg-riveting-start.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class AruPgRivetingStartComponent implements OnChanges, ProgramPresenter {
    // presenterAPI is optional
    @Input() presenterAPI: ProgramPresenterAPI;

    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // contributedNode is optional
    @Input() contributedNode: AruPgRivetingStartNode;

    duration: number;
    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                // 先设置默认语言，再使用当前语言
                this.translateService.setDefaultLang('en');
                
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
        if(changes?.contributedNode){
            this.duration = this.contributedNode.parameters.duration;
        }
    }

    afterLevelChange(){
        this.contributedNode.parameters.duration = this.duration;
        this.saveNode();
    }
    // call saveNode to save node parameters
    async saveNode() {
        this.cd.detectChanges();
        await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
    }
}
