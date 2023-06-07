import json
import boto3

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'image-db-g14'

def lambda_handler(event, context):
    data = json.loads(event['body'])
    
    url = data['url']
    # Delete the image from S3
    bucket = 'images-team14'
    key = url.split(bucket + '/')[-1]
    
    print("this is key")
    print(key)
    
    s3.delete_object(Bucket=bucket, Key=key)
    
    # Delete the image entry from DynamoDB
    table = dynamodb.Table(TABLE_NAME)
    response = table.delete_item(
        Key={'image-url': url}
    )
    
    response = {
        'statusCode': 200,
        'body': 'Image deleted successfully'
    }
    
    return {
        'statusCode': 200,
        'body': 'Image deleted successfully',
        'headers': {'Access-Control-Allow-Origin': '*'}
    }
