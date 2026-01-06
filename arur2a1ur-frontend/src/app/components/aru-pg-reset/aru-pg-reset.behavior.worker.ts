/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    TranslatedProgramLabelPart,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { AruPgResetNode } from './aru-pg-reset.node';

// programNodeLabel is required
const createProgramNodeLabel = (node: AruPgResetNode): OptionalPromise<TranslatedProgramLabelPart[]> => {
    const extensionPart: TranslatedProgramLabelPart = {
        type: 'secondary',
        translationKey: 'program.nodes.aru-pg-reset.description',
    };
    return [extensionPart];
};

// factory is required
const createProgramNode = (): OptionalPromise<AruPgResetNode> => ({
    type: 'lobtex-arur2a1ur-aru-pg-reset',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: AruPgResetNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    builder.addStatements('set_standard_digital_out(0, False)');
    builder.addStatements('set_standard_digital_out(1, False)');
    builder.addStatements('set_standard_digital_out(7, False)');
    builder.addStatements('set_tool_digital_out(0, False)');
    return builder;
};

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: AruPgResetNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: AruPgResetNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: AruPgResetNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
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
