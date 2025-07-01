// db.js
const dynamoose = require("dynamoose");
const AWS = require("aws-sdk");

// Set AWS credentials and region
AWS.config.update({
    region: process.env.AWS_REGION || "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Set Dynamoose to use this AWS config
dynamoose.aws.sdk = AWS;

module.exports = dynamoose;
