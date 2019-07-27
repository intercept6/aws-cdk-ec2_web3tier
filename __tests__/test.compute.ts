import { App, Stack } from "@aws-cdk/core";
import { SynthUtils } from "@aws-cdk/assert";
import { ComputeStack } from "../lib/compute-stack";
import { SecurityGroup, Vpc } from "@aws-cdk/aws-ec2";
import { Role, ServicePrincipal } from "@aws-cdk/aws-iam";

describe("compute", () => {
  test("default", () => {
    const app = new App();
    app.node.setContext("prj", "ssprj");
    app.node.setContext("stage", "ssstage");
    app.node.setContext("ssstage", {
      nat_gateways: 1
    });
    const givenStack = new Stack(app, "GivenStack");
    const instanceRole = new Role(givenStack, "TestRole", {
      roleName: "test",
      assumedBy: new ServicePrincipal("ec2.amazonaws.com")
    });
    const vpc = new Vpc(givenStack, "TestVPC");
    const sg = new SecurityGroup(givenStack, "TestSecurityGroup", {
      vpc: vpc
    });
    const stack = new ComputeStack(app, "TestComputeStack", {
      vpc: vpc,
      instanceRole: instanceRole,
      appSg: sg
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
