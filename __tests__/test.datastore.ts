import { App, Stack } from "@aws-cdk/core";
import { SynthUtils } from "@aws-cdk/assert";
import { DataStoreStack } from "../lib/datastore-stack";
import { SecurityGroup, SubnetType, Vpc } from "@aws-cdk/aws-ec2";

describe("datastore", () => {
  test("default", () => {
    const app = new App();
    app.node.setContext("prj", "ssprj");
    app.node.setContext("stage", "ssstage");
    app.node.setContext("ssstage", {
      nat_gateways: 1
    });
    const givenStack = new Stack(app, "GivenStack");
    const vpc = new Vpc(givenStack, "TestVPC", {
      subnetConfiguration: [
        { name: "Isolated", subnetType: SubnetType.ISOLATED }
      ]
    });
    const sg = new SecurityGroup(givenStack, "TestSecurityGroup", {
      vpc: vpc
    });
    const stack = new DataStoreStack(app, "TestDataStoreStack", {
      vpc: vpc,
      dbSg: sg
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
