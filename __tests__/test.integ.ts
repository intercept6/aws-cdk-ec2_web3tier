import {App} from "@aws-cdk/core";
import {SynthUtils} from "@aws-cdk/assert";
import {IdentityStack} from "../lib/identity-stack";
import {NetworkStack} from "../lib/network-stack";
import {ComputeStack} from "../lib/compute-stack";
import {DataStoreStack} from "../lib/datastore-stack";

describe("integ", () => {
    test("default", () => {
        const app = new App();
        app.node.setContext("prj", "ssprj");
        app.node.setContext("stage", "ssstage");
        app.node.setContext("ssstage", {
            nat_gateways: 1
        });
        const identityStack = new IdentityStack(app, "IdentityStack");
        const networkStack = new NetworkStack(app, "NetworkStack");
        const computeStack = new ComputeStack(app, "ComputeStack", {
            vpc: networkStack.vpc,
            appSg: networkStack.appSg,
            instanceRole: identityStack.instanceRole
        });
        // @aws-cdk/aws-rds is a developer preview (public beta) module. Releases might lack important features and might have future breaking changes.
        const datastoreStack = new DataStoreStack(app, "DataStoreStack", {
            vpc: networkStack.vpc,
            dbSg: networkStack.dbSg
        });
        expect(SynthUtils.toCloudFormation(identityStack)).toMatchSnapshot();
        expect(SynthUtils.toCloudFormation(networkStack)).toMatchSnapshot();
        expect(SynthUtils.toCloudFormation(computeStack)).toMatchSnapshot();
        expect(SynthUtils.toCloudFormation(datastoreStack)).toMatchSnapshot();
    });
});
