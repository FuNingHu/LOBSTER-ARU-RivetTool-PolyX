import { ProgramNode } from '@universal-robots/contribution-api';

export interface AruPgRivetSupplyNode extends ProgramNode {
    type: string;
    parameters: {
        time2Check: number;
        time2Open: number;
        time2Stop: number;
        language: string;  // Add language parameter
        threadId: string;  // Unique thread identifier for this node instance
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
