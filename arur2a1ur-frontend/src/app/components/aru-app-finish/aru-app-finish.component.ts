import { Component, Input } from '@angular/core';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';

@Component({
  selector: 'app-aru-app-finish',
  imports: [],
  templateUrl: './aru-app-finish.component.html',
  styleUrl: './aru-app-finish.component.scss'
})
export class AruAppFinishComponent {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;
}
