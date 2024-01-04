import { S3Client,GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv"
dotenv.config()

const s3ClientBucketPermissions = new S3Client({
    region:process.env.REGION_S3_INVOICE_PLATFORM_IMAGES,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID_USER_IAM_InvoicePlatformAccessS3,
        secretAccessKey:process.env.SECRET_ACCESS_KEY_USER_IAM_InvoicePlatformAccessS3
    }
})

async function GetImagenURLBucketPrivate(key){
    const command= new GetObjectCommand({
        Bucket:'invoice-platform-images',
        Key:key
    })
    const URL = await getSignedUrl(s3ClientBucketPermissions,command)
    return URL
}

async function GetImagenURLBucketPublic(key){
    const command= new GetObjectCommand({
        Bucket:'invoice-platform-images-public',
        Key:key
    })
    const response = await s3ClientBucketPermissions.send(command)
    const URL = `${response.Body.req.protocol}${response.Body.req.host}${response.Body.req.path}`
    return URL
}

async function GetPdfURLBucketPrivate(key){
    const command= new GetObjectCommand({
        Bucket:'invoice-platform-pdf-document-private',
        Key:key
    })
    const expiresInSeconds = 180;
    const URL = await getSignedUrl(s3ClientBucketPermissions,command, { expiresIn: expiresInSeconds })
    return URL
}

export {
    GetImagenURLBucketPublic,
    GetImagenURLBucketPrivate,
    GetPdfURLBucketPrivate
}