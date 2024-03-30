const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const env = require('./.env.json');

const s3 = new AWS.S3();

const BUCKET_NAME = env.AWS_S3_BUCKET_NAME;

const uploadFile = async (filePath, keyName) => {
  const file = fs.readFileSync(filePath);

  // Setting up S3 upload parameters
  const uploadParams = {
    Bucket: BUCKET_NAME, // Bucket into which you want to upload file
    Key: keyName, // Name by which you want to save it
    Body: file, // Local file
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log('Upload Success', decodeURIComponent(data.Location));
  } catch (error) {
    throw new Error(`Upload failed. ${error.code} ${error.message} ${error.stack}`);
  }
};

const getLatestFile = (dir) => {
  const files = fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  return files[0].file;
};

async function main() {
  const html_report = getLatestFile('./report/');
  const k6_log = 'k6.log';
  // const hub_log = 'hub.log';
  const k6_summary = 'summary.html';
  const bucket_path = `api_test/${html_report.slice(0, -5)}/`;
  console.log('\nUploading to ' + BUCKET_NAME);

  await uploadFile(`./report/${html_report}`, `${bucket_path}${k6_summary}`);

  // await uploadFile('/home/ubuntu/log/log', `${bucket_path}${hub_log}`);

  await uploadFile('./k6.log', `${bucket_path}${k6_log}`);
}

main();
