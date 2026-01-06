import { Component, Input } from '@angular/core';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';

@Component({
  selector: 'app-aru-app-check',
  imports: [],
  templateUrl: './aru-app-check.component.html',
  styleUrl: './aru-app-check.component.scss'
})
export class AruAppCheckComponent {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;
}
