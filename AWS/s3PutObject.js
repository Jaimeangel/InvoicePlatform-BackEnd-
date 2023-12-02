import { S3Client,PutObjectCommand} from "@aws-sdk/client-s3";
import dotenv from "dotenv"
dotenv.config()

const s3ClientImagenes = new S3Client({
    region:process.env.REGION_S3_INVOICE_PLATFORM_IMAGES,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID_USER_IAM_InvoicePlatformAccessS3,
        secretAccessKey:process.env.SECRET_ACCESS_KEY_USER_IAM_InvoicePlatformAccessS3
    }
})

async function postImagenToBucket(bucketName,file,nombreFile){
    const command = new PutObjectCommand({
        Bucket: bucketName, //el buckets nombre
        Key: nombreFile, //nombre de la imagen
        Body: file,// contenio de la imange
        ContentType: 'image/png',  // Especifica el tipo de contenido adecuado
    });
    const response = await s3ClientImagenes.send(command);
    return response
}

export default postImagenToBucket;