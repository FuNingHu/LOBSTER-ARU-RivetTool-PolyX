import { ProgramNode } from '@universal-robots/contribution-api';

export interface AruPgMandrelEjectionNode extends ProgramNode {
    type: string;
    parameters: {
        check_time: number;
        language: string;  // Add language parameter
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
