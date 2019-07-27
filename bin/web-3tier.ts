#!/usr/bin/env node
import "source-map-support/register";
import { NetworkStack } from "../lib/network-stack";
import { ComputeStack } from "../lib/compute-stack";
import { IdentityStack } from "../lib/identity-stack";
import { DataStoreStack } from "../lib/datastore-stack";
import { App } from "@aws-cdk/core";

const app = new App();

const identityStack = new IdentityStack(app, "IdentityStack");
const networkStack = new NetworkStack(app, "NetworkStack");
new ComputeStack(app, "ComputeStack", {
  vpc: networkStack.vpc,
  appSg: networkStack.appSg,
  instanceRole: identityStack.instanceRole
});
// @aws-cdk/aws-rds is a developer preview (public beta) module.
// Releases might lack important features and might have future breaking changes.
new DataStoreStack(app, "DataStoreStack", {
  vpc: networkStack.vpc,
  dbSg: networkStack.dbSg
});
