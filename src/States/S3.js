import aws from "aws-sdk"

const region ="us-east-1";
const  bucketName = "image-bucket-group14";
const accessKeyId = "";
const secretAccessKey = "";
const S3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion :"4"
})