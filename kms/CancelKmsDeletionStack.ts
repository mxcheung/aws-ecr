import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CancelKmsDeletionStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Replace with your actual key ARN
    const keyArn = 'arn:aws:kms:ap-southeast-2:123456789012:key/abcd-efgh-ijkl';

    co
