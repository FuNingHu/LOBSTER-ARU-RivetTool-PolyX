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
import { AruPgMandrelEjectionNode } from './aru-pg-mandrel-ejection.node';

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
        language: 'en'  // Default language
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: AruPgMandrelEjectionNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    
    // 根据 node.parameters.language 的值选择不同的 popup 消息
    const isJapanese = node.parameters.language === 'ja';
    const popupMessage = isJapanese 
        ? 'popup("バキュームがONとなっているかご確認ください。",title="マンドレル排出エラー",error=True,blocking=True)'
        : 'popup("Check that the vacuum is switched on.",title="Mandrel not ejected.",error=True,blocking=True)';
    
    builder.addRaw(`eject_error_flag = 0
                    thread maouta084d066():
                        set_tool_digital_out(0,False)
                        sleep(${node.parameters.check_time})
                        set_standard_digital_out(7,True)
                        eject_error_flag = 1
                        return False
                    end
                    ma = run maouta084d066()
                    while (get_standard_digital_in(2) == False):
                        if (eject_error_flag == 1):
                            kill ma
                            ${popupMessage}
                        end
                        sync()
                    end
                    kill ma`);
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
