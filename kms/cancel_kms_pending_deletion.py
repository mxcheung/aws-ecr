import boto3
import os

kms = boto3.client("kms")

def handler(event, context):
    key_id = os.environ["KMS_KEY_ID"]  # pass in your key ARN/ID
    try:
        response = kms.cancel_key_deletion(KeyId=key_id)
        print(f"Cancelled deletion for key: {response['KeyMetadata']['KeyId']}")
        return {
            "statusCode": 200,
            "body": f"Cancelled deletion for key {key_id}"
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        raise
