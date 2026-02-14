/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviorAPI,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    TranslatedProgramLabelPart,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { AruPgMandrelEjectionNode } from './aru-pg-mandrel-ejection.node';

// Generate a unique UUID for thread naming
function generateThreadId(): string {
    return 'xxxxxxxx'.replace(/x/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
}

// programNodeLabel is required
const createProgramNodeLabel = (node: AruPgMandrelEjectionNode): OptionalPromise<TranslatedProgramLabelPart[]> => {
    
    const extensionPart: TranslatedProgramLabelPart = {
        type: 'secondary',
        translationKey: 'program.nodes.aru-pg-mandrel-ejection.programLabel',
        interpolateParams: {
            checkTime: node.parameters.check_time.toString()
        },
    };
    
    return [extensionPart];
};

// factory is required
const createProgramNode = (): OptionalPromise<AruPgMandrelEjectionNode> => ({
    type: 'lobtex-arur2a1ur-aru-pg-mandrel-ejection',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
        check_time: 3,
        language: 'en',  // Default language
        threadId: generateThreadId()  // Generate unique thread ID for this node instance
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = async (node: AruPgMandrelEjectionNode): Promise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    
    // Get robot settings from API
    const api = new ProgramBehaviorAPI(self);
    
    // Use system language if node language is not set
    const language = (await api.settingsService.getRobotSettingsOnce()).language;
    
    const popupMessage = (language === 'ja') 
        ? 'popup("バキュームがONとなっているかご確認ください。",title="マンドレル排出エラー",error=True,blocking=True)'
        : 'popup("Check that the vacuum is switched on.",title="Mandrel not ejected.",error=True,blocking=True)';
    
    // Use the unique threadId to name variables and threads
    const threadId = node.parameters.threadId;
    const flagName = `eject_error_flag_${threadId}`;
    const threadName = `maout_${threadId}`;
    const threadHandle = `ma_${threadId}`;
    
    builder.addRaw(`${flagName} = 0
                    thread ${threadName}():
                        set_tool_digital_out(0,False)
                        sleep(${node.parameters.check_time})
                        set_standard_digital_out(7,True)
                        ${flagName} = 1
                        return False
                    end
                    ${threadHandle} = run ${threadName}()
                    while (get_standard_digital_in(2) == False):
                        if (${flagName} == 1):
                            kill ${threadHandle}
                            ${popupMessage}
                        end
                        sync()
                    end
                    kill ${threadHandle}`);
    return builder;
};

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: AruPgMandrelEjectionNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: AruPgMandrelEjectionNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: AruPgMandrelEjectionNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => {
    const node = loadedNode as AruPgMandrelEjectionNode;
    
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
