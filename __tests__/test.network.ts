import {App} from "@aws-cdk/core"
import {SynthUtils} from "@aws-cdk/assert"
import {NetworkStack} from '../lib/network-stack'

describe("network", () => {
    test("default", () => {
        const app = new App();
        app.node.setContext("prj", "ssprj");
        app.node.setContext("stage", "ssstage");
        app.node.setContext("ssstage", {
            "nat_gateways": 1
        });
        const stack = new NetworkStack(app, 'TestNetworkStack');
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
    })
});