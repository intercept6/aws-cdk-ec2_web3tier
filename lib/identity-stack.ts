import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { ManagedPolicy, Role, ServicePrincipal } from "@aws-cdk/aws-iam";

export class IdentityStack extends Stack {
  public readonly instanceRole: Role;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const prj: string = this.node.tryGetContext("prj");
    const stage: string = this.node.tryGetContext("stage");
    // const params: object = this.node.tryGetContext(stage);

    this.instanceRole = new Role(this, "IamRole", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
      roleName: `${prj}-${stage}-app`,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonEC2RoleforSSM"
        )
      ]
    });
  }
}
