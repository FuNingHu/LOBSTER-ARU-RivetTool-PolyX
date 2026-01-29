import { ProgramNode } from '@universal-robots/contribution-api';

export interface AruPgCheckNode extends ProgramNode {
    type: string;
    parameters: {
        language: string;  // Add language parameter
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
