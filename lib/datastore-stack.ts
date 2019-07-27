// @aws-cdk/aws-rds is a developer preview (public beta) module.
// Releases might lack important features and might have future breaking changes.

import {
  Construct,
  RemovalPolicy,
  Stack,
  StackProps,
  Tag
} from "@aws-cdk/core";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  ISecurityGroup,
  IVpc,
  SubnetType
} from "@aws-cdk/aws-ec2";
import { DatabaseCluster, DatabaseClusterEngine } from "@aws-cdk/aws-rds";

interface DataStoreStackProps extends StackProps {
  vpc: IVpc;
  dbSg: ISecurityGroup;
}

export class DataStoreStack extends Stack {
  constructor(scope: Construct, id: string, props: DataStoreStackProps) {
    super(scope, id, props);

    const prj: string = this.node.tryGetContext("prj");
    const stage: string = this.node.tryGetContext("stage");
    // const params: any = this.node.tryGetContext(stage);

    const cluster = new DatabaseCluster(this, "DBCluster", {
      engine: DatabaseClusterEngine.AURORA,
      masterUser: {
        username: "admin"
      },
      removalPolicy: RemovalPolicy.DESTROY,
      instanceProps: {
        instanceType: InstanceType.of(
          InstanceClass.MEMORY5,
          InstanceSize.LARGE
        ),
        vpcSubnets: {
          subnetType: SubnetType.ISOLATED
        },
        vpc: props.vpc,
        securityGroup: props.dbSg
      }
    });
    cluster.node.applyAspect(new Tag("Name", `${prj}-${stage}-db`));
  }
}
