import { minioClient } from 'src/clients';
import { v4 } from 'uuid';
import { Duplex } from 'stream';

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
      Resource: ['arn:aws:s3:::test-bucket'], // Change this according to your bucket name
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
      Resource: ['arn:aws:s3:::test-bucket/*'], // Change this according to your bucket name
    },
  ],
};

export const uploadImage = async (file: File): Promise<string> => {
  const bucket: string = process.env.MINIO_IMAGE_BUCKET ?? '';
  await minioClient.makeBucket(bucket, 'MINIO_IMAGE_BUCKET');

  await minioClient.setBucketPolicy(bucket, JSON.stringify(policy));

  const stream = new Duplex();
  stream.push(await file.arrayBuffer());
  stream.push(null);

  const assetId = `${v4()}.${file.name.split('.').pop()}`;

  minioClient.putObject(bucket, assetId, stream);

  return '';
};
