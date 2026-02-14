import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramPresenter, ProgramPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruPgMandrelEjectionNode } from './aru-pg-mandrel-ejection.node';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './aru-pg-mandrel-ejection.component.html',
    styleUrls: ['./aru-pg-mandrel-ejection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class AruPgMandrelEjectionComponent implements OnChanges, OnDestroy, ProgramPresenter {
    // presenterAPI is optional
    @Input() presenterAPI: ProgramPresenterAPI;

    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // contributedNode is optional
    @Input() contributedNode: AruPgMandrelEjectionNode;

    check_time: number;
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
                // firstly set default language, then use current language
                this.translateService.setDefaultLang('en');
                
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                
                // Subscribe to language changes to always keep node language updated
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
        
        if(changes?.contributedNode){
            this.check_time = this.contributedNode.parameters.check_time;
            // Initialize language if not set
            if (!this.contributedNode.parameters.language && this.robotSettings?.language) {
                this.updateNodeLanguage(this.robotSettings.language);
            }
        }
    }
    
    private setupLanguageSubscription(): void {
        // Unsubscribe from previous subscription if exists
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe();
        }
        
        // Subscribe to language changes
        this.languageSubscription = this.translateService.onLangChange.subscribe((event) => {
            if (this.contributedNode && event.lang) {
                this.updateNodeLanguage(event.lang);
            }
        });
    }
    
    private async updateNodeLanguage(language: string): Promise<void> {
        if (this.contributedNode && language && this.contributedNode.parameters.language !== language) {
            this.contributedNode.parameters.language = language;
            await this.saveNode();
        }
    }
    
    ngOnDestroy(): void {
        // Clean up subscription
        if (this.languageSubscription) {
            this.languageSubscription.unsubscribe();
        }
    }

    afterLevelChange(){
        this.contributedNode.parameters.check_time = this.check_time;
        this.saveNode();
    }
    // call saveNode to save node parameters
    async saveNode() {
        this.cd.detectChanges();
        await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
    }
}
