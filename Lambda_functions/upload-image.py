import json
import boto3
import os
import base64
import uuid

s3 = boto3.client('s3')
FOLDER = "images/"
BUCKET = "images-team14"


def lambda_handler(event, context):
    if event["httpMethod"] == 'POST':
        data = json.loads(event['body'])
        name = data['name']
        image = data['file']

        _, suffix = os.path.splitext(name)
        print(suffix)

        image = image[image.find(",") + 1:]

        id = uuid.uuid1()
        name = FOLDER + str(id.hex) + suffix

        decoded = base64.b64decode(image)

        s3.put_object(Bucket=BUCKET, Key=name, Body=decoded, ContentType='mimetype', ContentDisposition='inline')

        return {
            'statusCode': 200,
            'body': json.dumps({'s3-url': name}, default=str),
            'headers': {'Access-Control-Allow-Origin': '*'}
        }

    # TODO implement

