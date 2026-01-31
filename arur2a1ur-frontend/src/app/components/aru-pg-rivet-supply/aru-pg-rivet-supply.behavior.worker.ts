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
import { AruPgRivetSupplyNode } from './aru-pg-rivet-supply.node';

// Generate a unique UUID for thread naming
function generateThreadId(): string {
    return 'xxxxxxxx'.replace(/x/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
}

// programNodeLabel is required
const createProgramNodeLabel = (node: AruPgRivetSupplyNode): OptionalPromise<TranslatedProgramLabelPart[]> => {
    const extensionPart: TranslatedProgramLabelPart = {
        type: 'secondary',
        translationKey: 'program.nodes.aru-pg-rivet-supply.programLabel',
        interpolateParams: {
            time2Check: node.parameters.time2Check.toString(),
            time2Open: node.parameters.time2Open.toString(),
            time2Stop: node.parameters.time2Stop.toString()
        },
    };
    return [extensionPart];
};

// factory is required
const createProgramNode = (): OptionalPromise<AruPgRivetSupplyNode> => ({
    type: 'lobtex-arur2a1ur-aru-pg-rivet-supply',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
        time2Check: 3,
        time2Open: 0.2,
        time2Stop: 0.0,
        language: 'en',  // Default language
        threadId: generateThreadId()  // Generate unique thread ID for this node instance
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: AruPgRivetSupplyNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    
    // In function of node.parameters.language select different popup msg.
    const isJapanese = node.parameters.language === 'ja';
    const popupMessage = isJapanese 
        ? 'popup("フィーダー及びフィードヘッドの動作を確認してください。",title="リベット供給エラー",error=True,blocking=True)'
        : 'popup("Check feeder and feedhead.",title="Rivet not supplied.",error=True,blocking=True)';
    
    // Use the unique threadId to name variables and threads
    const threadId = node.parameters.threadId;
    const flagName = `supply_error_flag_${threadId}`;
    const threadName = `airout_${threadId}`;
    const threadHandle = `air_${threadId}`;
    
    builder.addRaw(`${flagName} = 0
                    thread ${threadName}():
                    set_standard_digital_out(0,True)
                    sleep(${node.parameters.time2Check})
                    set_standard_digital_out(7,True)
                    set_standard_digital_out(0,False)
                    ${flagName} = 1
                    return False
                    end
                    ${threadHandle} = run ${threadName}()
                    set_standard_digital_out(7,False)
                    set_standard_digital_out(1,True)
                    while (get_standard_digital_in(0) == False):
                    if (${flagName} == 1):
                        kill ${threadHandle}
                        ${popupMessage}
                    end
                    end
                    kill ${threadHandle}
                    sleep(${node.parameters.time2Open})
                    set_standard_digital_out(1,False)
                    sleep(${node.parameters.time2Stop})
                    set_standard_digital_out(0,False)
                `);
    return builder;
}
    // generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: AruPgRivetSupplyNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: AruPgRivetSupplyNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: AruPgRivetSupplyNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => {
    const node = loadedNode as AruPgRivetSupplyNode;
    
    // For backward compatibility, automatically generate threadId for old nodes
    if (!node.parameters.threadId) {
        node.parameters.threadId = generateThreadId();
    }
    
    return node;
};

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
