import { ProgramNode } from '@universal-robots/contribution-api';

export interface AruPgRivetingStartNode extends ProgramNode {
    type: string;
    parameters: {
        duration: number;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
