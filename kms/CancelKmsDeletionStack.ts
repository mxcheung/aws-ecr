import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CancelKmsDeletionStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Replace with your actual key ARN
    const keyArn = 'arn:aws:kms:ap-southeast-2:123456789012:key/abcd-efgh-ijkl';

    const fn = new lambda.Function(this, 'CancelKmsDeletionLambda', {
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
import boto3, os
kms = boto3.client("kms")
def handler(event, context):
    key_id = os.environ["KMS_KEY_ID"]
    response = kms.cancel_key_deletion(KeyId=key_id)
    return {"statusCode": 200, "body": f"Cancelled deletion for {key_id}"}
      `),
      environment: {
        KMS_KEY_ID: keyArn,
      },
    });

    // ✅ IAM permissions for the Lambda
    fn.addToRolePolicy(new iam.PolicyStatement({
      actions: ['kms:CancelKeyDeletion'],
      resources: [keyArn],
    }));
  }
}
