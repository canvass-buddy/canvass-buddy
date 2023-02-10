import { minioClient } from 'src/clients';
import { v4 } from 'uuid';
import { networkInterfaces } from 'os';

const createBucket = async (bucketName: string) => {
  if (await minioClient.bucketExists(bucketName)) return;
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          AWS: ['*'],
        },
        Action: [
          's3:ListBucketMultipartUploads',
          's3:GetBucketLocation',
          's3:ListBucket',
        ],
        Resource: [`arn:aws:s3:::${bucketName}`],
      },
      {
        Effect: 'Allow',
        Principal: {
          AWS: ['*'],
        },
        Action: [
          's3:PutObject',
          's3:AbortMultipartUpload',
          's3:DeleteObject',
          's3:GetObject',
          's3:ListMultipartUploadParts',
        ],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };
  await minioClient.makeBucket(bucketName, 'us-east-1');
  await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
};
Object.values({}).map((item) => item);

export const uploadFile = async (
  file: File,
  bucketName: string
): Promise<string> => {
  await createBucket(bucketName);
  const buffer = Buffer.from(await file.arrayBuffer());

  const assetId = `${v4()}.${file.name.split('.').pop()}`;

  minioClient.putObject(bucketName, assetId, buffer);

  return `${bucketName}/${assetId}`;
};
