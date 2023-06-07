import json
import boto3
from object_detect import *
from collections import Counter

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'image-db-g14'
table = dynamodb.Table(TABLE_NAME)

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'image-db-g14'
table = dynamodb.Table(TABLE_NAME)


def lambda_handler(event, context):
    print("it started from here")

    if event["httpMethod"] == 'POST':

        print("we are in if")

        data = json.loads(event['body'])
        image_b64 = data['image']

        discovered_tags = detect_image(image_b64)
        print(discovered_tags)
        count_dict_list = []

        counter = Counter(discovered_tags)

        for value, count in counter.items():
            count_dict = {'tag': value, 'count': count}
            count_dict_list.append(count_dict)

        print(count_dict_list)

        data = {"tags": count_dict_list}

        tags_group = data["tags"]

        res = []

        tags = []
        for i in tags_group:
            t = i['tag']
            tags.append(t)

        filter_expression = None
        for tag in tags:
            if filter_expression is None:
                filter_expression = boto3.dynamodb.conditions.Attr('tags').contains(tag)
            else:
                filter_expression = filter_expression & boto3.dynamodb.conditions.Attr('tags').contains(tag)

        response = table.scan(FilterExpression=filter_expression)

        print(tags_group)
        flag = 1
        for item in tags_group:
            tag = item['tag']
            count = item['count']
            print("first time printing count")
            print(count)
            db_items = response.get('Items')
            print(db_items)
            if db_items and flag == 1:
                for db_item in db_items:
                    if flag == 1:
                        print("second time printing count")
                        print(count)
                        tag_list = db_item['tags']
                        if tag_list.count(tag) >= count:
                            print(tag_list.count(tag))
                            print("this is the count in last", count)
                            print(tag)
                            res.append(db_item)
                        elif tag_list.count(tag) < count:
                            flag = 0
                            if db_item in res:
                                res.remove(db_item)
                                break
                            else:
                                break
                    else:
                        break
                else:
                    continue
                break

        print(res)
        urls = []
        s3_urls = []
        for r in res:
            urls.append(r['image_http_url'])

        for r in res:
            s3_urls.append(r['image-url'])

        return {
            'statusCode': 200,
            'body': json.dumps({"image url results": urls, "s3 url": s3_urls}, default=str),
            'headers': {'Access-Control-Allow-Origin': '*'}
        }




