/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { AruPgRivetingStartNode } from './aru-pg-riveting-start.node';

// programNodeLabel is required
const createProgramNodeLabel = (node: AruPgRivetingStartNode): OptionalPromise<string> => `switch on ${node.parameters.duration} sec`;

// factory is required
const createProgramNode = (): OptionalPromise<AruPgRivetingStartNode> => ({
    type: 'lobtex-arur2a1ur-aru-pg-riveting-start',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
        duration: 1.0
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: AruPgRivetingStartNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    builder.addStatements('set_tool_digital_out(0, True)');
    builder.sleep(node.parameters.duration);
    return builder;
};

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: AruPgRivetingStartNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: AruPgRivetingStartNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: AruPgRivetingStartNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => loadedNode;

const behaviors: ProgramBehaviors = {
    programNodeLabel: createProgramNodeLabel,
    factory: createProgramNode,
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
