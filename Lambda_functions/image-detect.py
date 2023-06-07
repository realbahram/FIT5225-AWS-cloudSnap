import json
import os
from object_detect import *
import boto3

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'image-db-g14'


def lambda_handler(event, context):
    print(os.listdir("/opt/yolo_tiny_configs"))

    for record in event['Records']:
        print("IN FOR LOOP")
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        print(bucket)
        print(key)
        print("File {0} uploaded to {1} bucket".format(key, bucket))
        image = s3_client.get_object(Bucket=bucket, Key=key)

        tags = readBytes(image["Body"].read())

        # print(tags)

        print("tags: {}".format(tags))

        s3_url = "s3://{0}/{1}".format(bucket, key)

        image_url = "https://images-team14.s3.amazonaws.com/" + key

        print(image_url)

        # print(s3_url)

        table = dynamodb.Table(TABLE_NAME)
        response = table.put_item(
            Item={
                'image-url': s3_url,
                'tags': tags,
                'image_http_url': image_url
            }
        )

        print("response start from here!!")
        print(response)

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
