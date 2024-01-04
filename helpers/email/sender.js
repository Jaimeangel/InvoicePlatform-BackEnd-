import emailTemplate from './emailTemplate.js';
import { Resend } from 'resend';
import dotenv from "dotenv"
dotenv.config()


async function enviarEmailTemplate(data){
    const {
        usuario,
        cliente,
        destinatario,
        referencia
    } = data;

    const USUARIO = usuario.toUpperCase()
    const REF = referencia.toUpperCase()
    const CLIENTE = cliente.toUpperCase()

    const resend = new Resend(process.env.API_KEY_RESEND);
    
    try {
        const data = await resend.emails.send({
          from: `${USUARIO} onboarding@resend.dev`,
          to: [`${destinatario}`],
          subject:`COTIZACION ${REF}`,
          html: emailTemplate({cliente:CLIENTE, cotizacion:REF})
        });
        return data
    } catch (error) {
        return console.error({ error });
    }

}

async function poolEnviarEmail(data){
    const {
        usuario,
        cliente,
        listaDestinario,
        referencia
    } = data;

    for(const correo of listaDestinario){
        try {
            const response = await enviarEmailTemplate({
                usuario,
                cliente,
                destinatario:correo,
                referencia
            })
        } catch (err) {
            console.log(`Error enviando correo ${err}`)
        }
        
    }
}

export {
    poolEnviarEmail,
    enviarEmailTemplate
}
