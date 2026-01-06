import { ProgramNode } from '@universal-robots/contribution-api';

export interface AruPgMandrelEjectionNode extends ProgramNode {
    type: string;
    parameters: {
        check_time: number;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
