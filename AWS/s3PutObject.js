import { S3Client,PutObjectCommand} from "@aws-sdk/client-s3";
import dotenv from "dotenv"
dotenv.config()

const s3ClientBucketPermissions = new S3Client({
    region:process.env.REGION_S3_INVOICE_PLATFORM_IMAGES,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID_USER_IAM_InvoicePlatformAccessS3,
        secretAccessKey:process.env.SECRET_ACCESS_KEY_USER_IAM_InvoicePlatformAccessS3
    }
})

async function postImagenToBucket(file,nombreFile){
    const command = new PutObjectCommand({
        Bucket: 'invoice-platform-images-public', //el buckets nombre
        Key: nombreFile, //nombre de la imagen
        Body: file,// contenio de la imange
        ContentType: 'image/png',  // Especifica el tipo de contenido adecuado
    });
    const response = await s3ClientBucketPermissions.send(command);
    return response
}

async function postPdfToBucket(file,nombreFile){
    const command = new PutObjectCommand({
        Bucket: 'invoice-platform-pdf-document-private', //el buckets nombre
        Key: nombreFile, //nombre de la imagen
        Body: file,// contenio de la imange
        ContentType: 'application/pdf',  // Especifica el tipo de contenido adecuado
    });
    const response = await s3ClientBucketPermissions.send(command);
    return response
}

export {
    postImagenToBucket,
    postPdfToBucket
}