import { Component, Input } from '@angular/core';
import { ApplicationPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { AruAppNode } from '../aru-app/aru-app.node';

@Component({
  selector: 'app-aru-app-supply',
  imports: [],
  templateUrl: './aru-app-supply.component.html',
  styleUrl: './aru-app-supply.component.scss'
})
export class AruAppSupplyComponent {
  @Input() applicationAPI: ApplicationPresenterAPI;
  @Input() robotSettings: RobotSettings;
  @Input() applicationNode: AruAppNode;
}
