require("dotenv").config();
const fs = require("fs");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
    endpoint: process.env.ENDPOINT,
    forcePathStyle: true,
});

const bucketName = "first-bucket";
const fileObjectKey = "first-entry.txt";

(async () => {
    try {
        const readObjectResult = await s3.send(
            new GetObjectCommand({ Bucket: bucketName, Key: fileObjectKey })
        );

        const writeStream = fs.createWriteStream(
            "./object-read-from-minio.txt"
        );
        readObjectResult.Body.on("data", (chunk) => writeStream.write(chunk));
    } catch (err) {
        console.log("Error: ", err);
    }
})();
