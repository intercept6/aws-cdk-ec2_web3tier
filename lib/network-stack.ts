import { Construct, Stack, StackProps, Tag } from "@aws-cdk/core";
import { Port, SecurityGroup, SubnetType, Vpc } from "@aws-cdk/aws-ec2";

export class NetworkStack extends Stack {
    public readonly vpc: Vpc;
    public readonly appSg: SecurityGroup;
    public readonly dbSg: SecurityGroup;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const prj: string = this.node.tryGetContext("prj");
        const stage: string = this.node.tryGetContext("stage");
        const params: any = this.node.tryGetContext(stage);

    this.vpc = new Vpc(this, "VPC", {
      enableDnsHostnames: true,
      enableDnsSupport: true,
      natGateways: params.nat_gateways,
      maxAzs: 2,
      subnetConfiguration: [
        { name: "Public", subnetType: SubnetType.PUBLIC, cidrMask: 24 },
        { name: "Private", subnetType: SubnetType.PRIVATE, cidrMask: 24 },
        { name: "Isolated", subnetType: SubnetType.ISOLATED, cidrMask: 24 }
      ]
    });
    this.vpc.node.applyAspect(new Tag("Name", `${prj}-${stage}-vpc`));

    this.appSg = new SecurityGroup(this, "AppSg", {
      allowAllOutbound: true,
      vpc: this.vpc,
      securityGroupName: `${prj}-${stage}-app`,
      description: `${prj}-${stage}-app`
    });
    this.appSg.addIngressRule(
      this.appSg,
      Port.tcp(80),
      "allow http access from alb"
    );
    this.appSg.node.applyAspect(new Tag("Name", `${prj}-${stage}-app`));

    this.dbSg = new SecurityGroup(this, "DbSg", {
      allowAllOutbound: true,
      vpc: this.vpc,
      securityGroupName: `${prj}-${stage}-db`,
      description: `${prj}-${stage}-db`
    });
    this.dbSg.addIngressRule(
      this.appSg,
      Port.tcp(3306),
      "allow db access from app server"
    );
    this.dbSg.node.applyAspect(new Tag("Name", `${prj}-${stage}-db`));
  }
}
