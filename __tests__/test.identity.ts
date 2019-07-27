import { App } from "@aws-cdk/core";
// import { InstanceType, UserData, Vpc } from "@aws-cdk/aws-ec2"
import { SynthUtils } from "@aws-cdk/assert";
import { IdentityStack } from "../lib/identity-stack";

describe("identity", () => {
  test("default", () => {
    const app = new App();
    app.node.setContext("prj", "ssprj");
    app.node.setContext("stage", "ssstage");
    const stack = new IdentityStack(app, "TestIdentityStack");
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
