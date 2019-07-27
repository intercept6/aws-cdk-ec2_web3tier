# Useful commands

 * `npm run build`  TypeScriptをコンパイルする
 * `npm run build`  TypeScriptをコンパイルする
 * `npm run watch`   変更を監視してTypeScriptをコンパイルする
 * `npm run test`   CloudFormationでSnapShotテスト
 * `jest --updateSnapshot`  SnapShotの更新
 * `cdk bootstrap`  CDKツールキットスタックをAWS環境にデプロイする
 * `cdk deploy -c stage=(dev|stg|prd)`     スタックをデフォルトのAWSアカウント/リージョンにデプロイする
 * `cdk diff -c stage=(dev|stg|prd)`   スタックを現在のデプロイされた状態と比較する
 * `cdk synth -c stage=(dev|stg|prd)`  合成されたCloudFormationテンプレートを発行します


```
{
  "name": "web-3tier",
  "version": "0.1.0",
  "bin": {
    "web-3tier": "bin/web-3tier.js"
  },
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w",
    "cdk": "cdk",
    "test": "tsc && jest"
  },
  "devDependencies": {
    "@aws-cdk/assert": "^1.2.0",
    "@types/jest": "^24.0.15",
    "@types/node": "8.10.45",
    "aws-cdk": "^1.2.0",
    "ts-jest": "^24.0.2",
    "ts-lint": "^4.5.1",
    "ts-node": "^8.1.0",
    "typescript": "^3.3.3333"
  },
  "dependencies": {
    "@aws-cdk/aws-autoscaling": "^1.2.0",
    "@aws-cdk/aws-ec2": "^1.2.0",
    "@aws-cdk/aws-elasticloadbalancingv2": "^1.2.0",
    "@aws-cdk/aws-iam": "^1.2.0",
    "@aws-cdk/aws-rds": "^1.2.0",
    "@aws-cdk/core": "^1.2.0",
    "source-map-support": "^0.5.9"
  },
  "jest": {
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "globals": {
      "ts-jest": {
        "tsConfigFile": "tsconfig.json"
      }
    },
    "testMatch": [
      "**/__tests__/*.+(ts|tsx|js)"
    ]
  }
}

```