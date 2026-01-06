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
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: AruPgRivetSupplyNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    builder.addRaw(`supply_error_flag7a8337ac = 0
                    thread airout7a8337ac():
                    set_standard_digital_out(0,True)
                    sleep(${node.parameters.time2Check})
                    set_standard_digital_out(7,True)
                    set_standard_digital_out(0,False)
                    supply_error_flag7a8337ac = 1
                    return False
                    end
                    air = run airout7a8337ac()
                    set_standard_digital_out(7,False)
                    set_standard_digital_out(1,True)
                    while (get_standard_digital_in(0) == False):
                    if (supply_error_flag7a8337ac == 1):
                        kill air
                        popup("Check feeder and feedhead.",title="Rivet not supplied.",error=True,blocking=True)
                    end
                    end
                    kill air
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
