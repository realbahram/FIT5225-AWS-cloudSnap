import json
import boto3

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'image-db-g14'

def lambda_handler(event, context):
    if event['httpMethod'] == 'POST':
        # Parse the incoming JSON message
        data = json.loads(event['body'])
        image_url = data['url']
        operation_type = data['type']
        items = data['tags']
        tags = []
        for item in items:
            tags.append(item["tag"])
            
        # Retrieve the image data from the database
        table = dynamodb.Table(TABLE_NAME)
        response = table.scan(
            FilterExpression='#url = :url',
            ExpressionAttributeNames={'#url': 'image-url'},
            ExpressionAttributeValues={':url': image_url}
        )
        items = response.get('Items', [])

        if items:
            image_data = items[0]
        else:
            # No matching item found, create a new item with default values
            image_data = {
                'image-url': image_url,
                'tags': []
            }

        # Add or remove tags based on the operation type
        existing_tags = image_data.get('tags', [])
        updated_tags = existing_tags

        if operation_type == 1:  # Add tags
            for tag in tags:
                updated_tags.append(tag)
        elif operation_type == 0:  # Remove tags
            for tag in tags:
                if tag in updated_tags:
                    updated_tags.remove(tag)

        # Update the tags in the image data
        image_data['tags'] = updated_tags

        # Save the updated image data back to the database
        table.put_item(Item=image_data)

        # Prepare the response
        return {
            'statusCode': 200,
            'body': json.dumps('Tags updated successfully.', default=str),
            'headers': {'Access-Control-Allow-Origin': '*'}
        }
