/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    PopupLevel,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    TranslatedProgramLabelPart,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { AruPgCheckNode } from './aru-pg-check.node';

const createProgramNodeLabel = (node: AruPgCheckNode): OptionalPromise<string> => '';

// backup of previous code
// programNodeLabel is required
// const createProgramNodeLabel = (node: AruPgCheckNode): OptionalPromise<TranslatedProgramLabelPart[]> => {
//     const extensionPart: TranslatedProgramLabelPart = {
//         type: 'secondary',
//         translationKey: 'program.nodes.aru-pg-check.programLabel',
//     };
//     return [extensionPart];
// };

// factory is required
const createProgramNode = (): OptionalPromise<AruPgCheckNode> => ({
    type: 'lobtex-arur2a1ur-aru-pg-check',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
        language: 'en'  // Default language
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: AruPgCheckNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    
    // In function of node.parameters.language select different popup msg.
    const isJapanese = node.parameters.language === 'ja';
    
    builder.addStatements('set_standard_digital_out(7,False)');
    builder.addStatements('set_standard_digital_out(1,True)');
    builder.ifCondition('get_standard_digital_in(1) == False');
    builder.addStatements('set_standard_digital_out(7,True)');
    
    // In function of language select popup content
    if (isJapanese) {
        builder.popup('バキュームがONとなっているかご確認ください。', 'リベットセットエラー', PopupLevel.ERROR, true);
    } else {
        builder.popup('Check the vacuum is switched on.', 'Rivet is not set', PopupLevel.ERROR, true);
    }
    
    builder.end();
    builder.addStatements('set_standard_digital_out(7,False)');
    return builder;
};

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: AruPgCheckNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: AruPgCheckNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: AruPgCheckNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
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
