import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramPresenter, ProgramPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruPgCheckNode } from './aru-pg-check.node';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './aru-pg-check.component.html',
    styleUrls: ['./aru-pg-check.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class AruPgCheckComponent implements OnChanges, OnDestroy, ProgramPresenter {
    // presenterAPI is optional
    @Input() presenterAPI: ProgramPresenterAPI;

    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // contributedNode is optional
    @Input() contributedNode: AruPgCheckNode;

    private languageSubscription: Subscription | undefined;

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
                
                // Subscribe to language changes
                this.setupLanguageSubscription();
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
            
            // Save language to node parameters
            this.updateNodeLanguage(changes?.robotSettings?.currentValue?.language);
        }
        
        if (changes?.contributedNode) {
            // Initialize language if not set
            if (!this.contributedNode.parameters.language && this.robotSettings?.language) {
                this.updateNodeLanguage(this.robotSettings.language);
            }
        }
    }
    
    private setupLanguageSubscription(): void {
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe();
        }
        
        this.languageSubscription = this.translateService.onLangChange.subscribe((event) => {
            if (this.contributedNode && event.lang) {
                this.updateNodeLanguage(event.lang);
            }
        });
    }
    
    private updateNodeLanguage(language: string): void {
        if (this.contributedNode && language && this.contributedNode.parameters.language !== language) {
            this.contributedNode.parameters.language = language;
            this.saveNode();
        }
    }
    
    ngOnDestroy(): void {
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe();
        }
    }

    // call saveNode to save node parameters
    async saveNode() {
        this.cd.detectChanges();
        await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
    }
}
