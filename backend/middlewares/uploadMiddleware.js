const { S3Client } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');

// Create an S3 client using AWS SDK v3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const upload = (folder) => multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'private',
        key: function (req, file, cb) {
            // Use the passed folder name for storage
            const folderPath = `${folder}/${Date.now().toString()}-${file.originalname}`;
            cb(null, folderPath);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit (optional)
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only images are allowed!'), false);
        }
    }
});

module.exports = upload;
