require("dotenv").config();
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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
    const objectKey = "first-entry.txt";

    try {
        // uploading object with string data on Body
        await s3.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
                Body: "Hello there again",
            })
        );

        console.log(`Successfully uploaded ${bucketName}/${objectKey}`);

        const fileObjectKey = "uploaded-file.txt";
        const fileObjectData = fs.readFileSync("./file.txt");

        await s3.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: fileObjectKey,
                Body: fileObjectData,
            })
        );

        console.log(`Successfully uploaded ${bucketName}/${fileObjectKey}`);
    } catch (err) {
        console.log("Error", err);
    }
})();
