# Status

[![CircleCI](https://circleci.com/gh/kmd2kmd/aws-cdk-ec2_web3tier/tree/master.svg?style=svg)](https://circleci.com/gh/kmd2kmd/aws-cdk-ec2_web3tier/tree/master)

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
 