import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class EcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = new ecr.Repository(this, 'MyRepo', {
      repositoryName: 'my-repo',
    });

    // Allow everyone (*) to delete images
    repo.addToResourcePolicy(new iam.PolicyStatement({
      principals: [new iam.AnyPrincipal()],
      actions: [
        "ecr:BatchDeleteImage",
        "ecr:DeleteRepository",
        "ecr:BatchGetImage",
        "ecr:DescribeImages",
      ],
      resources: [repo.repositoryArn],
    }));
  }
}
