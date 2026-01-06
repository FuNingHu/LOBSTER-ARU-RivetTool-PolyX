import { Component, Input } from '@angular/core';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';

@Component({
  selector: 'app-aru-app-start',
  imports: [],
  templateUrl: './aru-app-start.component.html',
  styleUrl: './aru-app-start.component.scss'
})
export class AruAppStartComponent {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;
}
