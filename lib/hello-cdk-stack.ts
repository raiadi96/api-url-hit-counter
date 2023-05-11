import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw  from 'aws-cdk-lib/aws-apigateway';
import {HitCounterStack} from  './hit_counter';
import {TableViewer} from 'cdk-dynamo-table-viewer'

export class HelloCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
  const hello_lambda = new lambda.Function(this, 'HelloHandler', 
  {
    runtime: lambda.Runtime.NODEJS_16_X,
    code: lambda.Code.fromAsset('lambda'),
    handler: 'hello.handler',
  });

  const hit_counter = new HitCounterStack(this, 'HelloHitCounter', {
    downstream: hello_lambda
  });

  const apigateway = new apigw.LambdaRestApi(this, 'Endpoint', {
    handler: hit_counter.handler
  });


}
}
