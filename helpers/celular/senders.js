import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

async function enviarCelularTemplate(data){
    const {
        cliente,
        destinatario,
        referencia,
        file
    } = data;

    const REF = referencia.toUpperCase()
    const CLIENTE = cliente.toUpperCase()

    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`
        }
    }

    const body={
        "messaging_product": "whatsapp",
        "to": `57${destinatario}`,
        "type": "template",
        "template": {
            "name": "invoice_pdf",
            "language": {
                "code": "es"
            },
            "components": [
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "document",
                            "document": {
                                "link": file,
                                "filename":`cotizacion-${REF}-${CLIENTE}`
                            }
                        }
                    ]
                },
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": `${CLIENTE}`
                        },
                        {
                            "type": "text",
                            "text": `${REF}`
                        }
                    ]
                }
            ]
        }
    }
    try {
        const response = await axios.post('https://graph.facebook.com/v17.0/185249261346930/messages',body,config)
    } catch (error) {
        console.log(error)
    }
}

async function poolEnviarCelular(data){
    const {
        cliente,
        listaDestinario,
        referencia,
        file
    } = data;

    for(const celular of listaDestinario){
        const response = await enviarCelularTemplate({
            cliente,
            destinatario:celular,
            referencia,
            file
        })
    }
}

export {
    poolEnviarCelular
}