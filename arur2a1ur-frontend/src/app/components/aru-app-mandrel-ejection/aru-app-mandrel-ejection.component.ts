import { Component, Input } from '@angular/core';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';

@Component({
  selector: 'app-aru-app-mandrel-ejection',
  imports: [],
  templateUrl: './aru-app-mandrel-ejection.component.html',
  styleUrl: './aru-app-mandrel-ejection.component.scss'
})
export class AruAppMandrelEjectionComponent {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;
}
