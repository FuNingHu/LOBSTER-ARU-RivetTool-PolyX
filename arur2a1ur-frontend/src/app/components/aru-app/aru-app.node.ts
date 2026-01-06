import { ApplicationNode } from '@universal-robots/contribution-api';

export interface AruAppNode extends ApplicationNode {
  type: string;
  version: string;
}
