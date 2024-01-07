import emailTemplate from './emailTemplate.js';

import nodemailer from 'nodemailer';

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
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1a9863939c9ab2",
          pass: "c33aed3701e3ae"
        }
    });

    const infoEmail = await transport.sendMail({
        from:`${USUARIO} lacentraldeoveroles@hotmail.com`,
        to:`${destinatario}`,
        subject:`COTIZACION ${REF} ${USUARIO}`,
        html:emailTemplate({cliente:CLIENTE, cotizacion:REF}),
        attachments: [{
            filename: `cotizacion-${REF}-${CLIENTE}-${USUARIO}.pdf`,
            path : file
        }]
    })

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
