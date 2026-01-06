import { Component, Input } from '@angular/core';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';

@Component({
  selector: 'app-aru-app-reset',
  imports: [],
  templateUrl: './aru-app-reset.component.html',
  styleUrl: './aru-app-reset.component.scss'
})
export class AruAppResetComponent {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;
}
