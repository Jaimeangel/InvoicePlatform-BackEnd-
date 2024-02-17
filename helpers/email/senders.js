import emailTemplate from './emailTemplate.js';
import nodemailer from 'nodemailer';

import dotenv from "dotenv"
dotenv.config()

async function enviarEmailTemplate(data){
    const {
        usuario,
        cliente,
        destinatario,
        referencia,
        file
    } = data;


    const USUARIO = usuario.toUpperCase()
    const REF = referencia.toUpperCase()
    const CLIENTE = cliente.toUpperCase()

    const transport = nodemailer.createTransport({
        host: "smtp.office365.com", 
        port: 587,
        secure:false,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD_EMAIL
        },
        secureConnection: 'false',
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });


    try {
        const infoEmail = await transport.sendMail({
            from:`${USUARIO} Centraldeoveroles10@hotmail.com`,
            to:`${destinatario}`,
            subject:`COTIZACION ${REF} ${USUARIO}`,
            html:emailTemplate({cliente:CLIENTE, cotizacion:REF}),
            attachments: [{
                filename: `cotizacion-${REF}-${CLIENTE}-${USUARIO}.pdf`,
                path : file
            }]
        })
    } catch (error) {
        console.log(error)
    }

}

async function poolEnviarEmail(data){
    const {
        usuario,
        cliente,
        listaDestinario,
        referencia,
        file
    } = data;

    for(const correo of listaDestinario){
        const response = await enviarEmailTemplate({
            usuario,
            cliente,
            destinatario:correo,
            referencia,
            file
        })
    }
}

export {
    poolEnviarEmail
}
