import { ProgramNode } from '@universal-robots/contribution-api';

export interface AruPgMandrelEjectionNode extends ProgramNode {
    type: string;
    parameters: {
        check_time: number;
        language: string;  // Add language parameter
        threadId: string;  // Unique thread identifier for this node instance
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
