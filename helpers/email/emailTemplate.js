function emailTemplate(data){
    const {
        cliente,
        cotizacion
    }=data;
    return `
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

            <head>
            
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            
            <!-- Your title goes here -->
            <title>Newsletter</title>
            <!-- End title -->
            
            <!-- Start stylesheet -->
            <style type="text/css">
                a, a[href], a:hover, a:link, a:visited {
                    /* This is the link colour */
                    text-decoration: none!important;
                    color: #0000EE;
                }
            
                .link {
                    text-decoration: underline!important;
                }
            
                p, p:visited {
                    /* Fallback paragraph style */
                    font-size: 15px;
                    line-height: 24px;
                    font-family: 'Helvetica', Arial, sans-serif;
                    font-weight: 300;
                    text-decoration: none;
                    color: #000000;
                }
            
                h1 {
                    /* Fallback heading style */
                    font-size: 22px;
                    line-height: 24px;
                    font-family: 'Helvetica', Arial, sans-serif;
                    font-weight: normal;
                    text-decoration: none;
                    color: #000000;
                }
            
                .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {
                    line-height: 100%;
                }
            
                .ExternalClass {
                    width: 100%;
                }
            </style>
            <!-- End stylesheet -->
            
            </head>
            
            <!-- You can change background colour here -->
            <body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center">
            
            <!-- Fallback force center content -->
            <div style="text-align: center;">
            
                <!-- Email not displaying correctly -->
                <table align="center" style="text-align: center; vertical-align: middle; width: 100%; max-width: 600px;" width="100%">
                    <tbody>
                    <tr>
                        <td style="width: 100%; vertical-align: middle;" width="100%">
            
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- Email not displaying correctly -->
            
                <!-- Start container for logo -->
                <table align="center" style="text-align: center; vertical-align: top; width: 100%; max-width: 600px; background-color: #ffffff;" width="100%">
                    <tbody>
                    <tr>
                        <td style="width: 100%; vertical-align: top; padding-left: 10px; padding-right: 10px; padding-top: 15px; padding-bottom: 15px;" width="100%">
            
                            <!-- Your logo is here -->
                            <img style="width: 110px; text-align: center; color: #ffffff; display: block; margin: 0 auto;" alt="Logo" src="https://invoice-platform-images-public.s3.amazonaws.com/651a426e2d7da94d05b00ced-image-profile" align="center">
            
                            <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">LA CENTRAL DE OVEROLES SAS ZOMAC</h1>
            
                            <h1 style="font-size: 20px; line-height: 10px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000; letter-spacing: 0.5px;">NIT: 901226228-1</h1>
            
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- End container for logo -->
            
                <!-- Start single column section -->
                <table align="center" style="text-align: center; width: 100%; max-width: 600px; background-color: #F5F5F5;" width="100%">
                    <tbody>
                    <tr>
                        <td style="width: 100%; padding-left: 10px; padding-right: 10px; padding-top: 15px; padding-bottom: 15px;" width="100%">
            
                            <h1 style="text-align:left;  font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Estimado/a ${cliente},</h1>
            
                            <h1 style="text-align:left;  font-size: 17px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Numero de cotizacion: ${cotizacion}</h1>
            
                            <p style="text-align:justify; margin-top: 15px; font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #000000;">Adjunto a este correo electrónico, encontrará el archivo PDF con los detalles completos de su cotización. Por favor, revise el documento y no dude en ponerse en contacto con nosotros si tiene alguna pregunta o si necesita información adicional.</p>
            
                            <p style="text-align:justify; font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #000000;">¡Agradecemos su interés y esperamos poder atenderlo pronto!</p>
            
                            <h2 style="text-align:left;  font-size: 17px; margin-top: 20px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">LA CENTRAL DE OVEROLES SAS ZOMAC</h2>
                            <h2 style="text-align:left;  font-size: 17px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Equipo Comercial</h2>
            
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- End single column section -->
            
            
                <!-- Start footer -->
                <table align="center" style="text-align: center; vertical-align: top; width: 100%; max-width: 600px; background-color: #000000;" width="100%">
                    <tbody>
                    <tr>
                        <td style="width: 100%; vertical-align: top; padding-left: 10px; padding-right: 10px; padding-top: 15px; padding-bottom: 15px;" width="100%">
            
                            <!-- Your inverted logo is here -->
                            <img style="width: 80px; text-align: center; color: #ffffff; display: block; margin: 0 auto;" alt="Logo" src="https://invoice-platform-images-public.s3.amazonaws.com/651a426e2d7da94d05b00ced-image-profile" align="center">
            
                            <p style="margin-top: 10px; font-size: 13px; line-height: 10px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #ffffff;">
                                CALLE 10 # 11-44 BARRIO CENTRO
                            </p>
            
                            <p style="margin-top: 10px; font-size: 13px; line-height: 10px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
                                VILLANUEVA-CASANARE
                            </p>
            
                            <p style="margin-top: 10px; font-size: 13px; line-height: 10px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
                                CELULAR: 310 349 96 63
                            </p>
            
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- End footer -->
            
            </div>
            
            </body>
            
            </html>
    
    `

}

export default emailTemplate;
