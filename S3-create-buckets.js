require("dotenv").config();
const {
    S3Client,
    CreateBucketCommand,
    ListBucketsCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
    endpoint: process.env.ENDPOINT,
    forcePathStyle: true,
});

const bucketName = "first-bucket";

(async () => {
    try {
        const createBucketResult = await s3.send(
            new CreateBucketCommand({ Bucket: bucketName })
        );

        console.log("CreateBucketResult: ", createBucketResult.Location);

        // an empty object has to be passed otherwise won't work
        const listBucketsResult = await s3.send(new ListBucketsCommand({}));

        console.log("ListBucketsResult: ", listBucketsResult.Buckets);
    } catch (err) {
        console.log("Error", err);
    }
})();
