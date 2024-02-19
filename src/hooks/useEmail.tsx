import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";


export async function sendEmailCode(email: any, codigo: any, name: any) {

  try {
    const collectionRef = collection(db, 'mail');
    const emailContent = {
      to: [email],
      message: {
        from: 'ROGANS 🩺',
        subject: "Restablece tu contraseña Rogans App 🔒",
        html: 
        `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
            <style type="text/css">
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #F5F5F5;
                }
                .button {
                    background-color: #009688;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .social-icons img {
                    width: 24px;
                    height: auto;
                    margin-right: 10px;
                }
                .footer-text {
                    font-size: 12px;
                    color: #878787;
                }
                @media screen and (max-width: 600px) {
                    .bg {
                        background-image: url('https://rogansya.com/rogans-app/assets/lock2.png') !important;
                        background-position: bottom right !important;
                        background-size: 35% !important;
                    }
                    .hide {
                        display: none;
                    }
                    .mobile-p {
                        padding: 20px 38px !important;
                    }
                }
            </style>
        </head>
        <body>
            <center>
                <table border="0" cellspacing="0" cellpadding="0" style="background-color: #FCFCFC; margin-top: 30px; border-radius: 25px; max-width: 600px; width: 100%;">
                    <tbody>
                        <tr>
                            <td colspan="3" align="center" valign="top" style="padding-top: 40px;">
                                <img src="https://rogansya.com/rogans-app/assets/logo.png" alt="logo" style="max-width: 150px;">
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="bg" style="background-image: url('https://rogansya.com/rogans-app/assets/grupo.png'); background-repeat: no-repeat; background-size: 88%; background-position: 25% 70%;">
                            <td style="width: 50px;" class="hide"></td>
                            <td align="left" valign="top" style="padding: 20px;" class="mobile-p">
                                <h1 style="font-size: 60px; line-height: 1; font-weight: 600; color: #50DFCA; margin: 20px 0;"><span style="color: #000000; font-weight: 300;">Hola,</span><br> ${name ? name : ''}</h1>
                                <p style="font-size: 12px; color: #909090; margin-top: 20px; margin-bottom: 4px;">Tu código de verificación:</p>
                                <p style="font-size: 24px; font-weight: 500; color: #909090; margin-top: 0; padding: 10px; border: 1px solid #C0C0C0; border-radius: 12px; display: inline-block;">${codigo}</p>
                            </td>
                            <td align="center" valign="bottom" class="hide">
                                <img src="https://rogansya.com/rogans-app/assets/lock.png" alt="estetoscopio" style="max-width: 300px; margin-top: 150px;">
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colspan="3" align="center">
                                <div class="social-icons">
                                    <a href="https://www.instagram.com/rogans.formula/"><img src="https://rogansya.com/rogans-app/assets/instagram.png" alt="Instagram" style="width: 18px; height: 18px;"></a>
                                    <a href="https://www.facebook.com/Rogansmen"><img src="https://rogansya.com/rogans-app/assets/facebook.png" alt="Facebook" style="width: 18px; height: 17px;"></a>
                                    <a href="https://www.tiktok.com/@MS4wLjABAAAAaxxbTVy9DSGGwuc03tcTTTmmMjBVnfeA_rKO1txVEKUhxraj70zn9tdnfAYWJVZs"><img src="https://rogansya.com/rogans-app/assets/tiktok.png" alt="TikTok" style="width: 18px; height: 16px;"></a>
                                    <a href="https://www.youtube.com/@rogans5984"><img src="https://rogansya.com/rogans-app/assets/youtube.png" alt="YouTube" style="width: 18px; height: 18px;"></a>
                                    <a href="https://www.linkedin.com/company/rogans/"><img src="https://rogansya.com/rogans-app/assets/linkedin.png" alt="LinkedIn" style="width: 15px; height: 14px;"></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" align="center" style="padding-bottom: 20px;">
                                <p class="footer-text" style="padding: 0;">© 2024 ROGANS. Derechos reservados</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </body>
        </html> 
    `,
      }

    }
    console.log(``)
    return await addDoc(collectionRef, emailContent)
  } catch (error) {
    console.log('error', error)
  }


}


export async function sendEmailCodePromotion(email: any, codigo: any, name: any) {

  try {
    const collectionRef = collection(db, 'mail');
    
    const emailContent = {
      to: [email],
      message: {
        from: 'ROGANS 🩺',
        subject: "🌟¡Tu Cupón ya está disponible! 🎟️",
        html: `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
            <style type="text/css">
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #F5F5F5;
                }
                .button {
                    background-color: #009688;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .social-icons img {
                    width: 24px;
                    height: auto;
                    margin-right: 10px;
                }
                .footer-text {
                    font-size: 12px;
                    color: #878787;
                }
                @media screen and (max-width: 600px) {
                    .hide {
                        display: none;
                    }
                    .mobile-p {
                        padding: 20px 38px !important;
                    }
                }
            </style>
        </head>
        <body>
            <center>
                <table border="0" cellspacing="0" cellpadding="0" style="background-color: #FCFCFC; margin-top: 30px; border-radius: 25px; max-width: 600px; width: 100%;">
                    <tbody>
                        <tr>
                            <td colspan="3" align="center" valign="top" style="padding-top: 40px;">
                                <img src="https://rogansya.com/rogans-app/assets/logo.png" alt="logo" style="max-width: 150px;">
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td style="width: 35px;" class="hide"></td>
                            <td align="left" valign="middle" style="padding: 20px;" class="mobile-p">
                                ${name ? `<h1 style="font-size: 35px; line-height: 1; font-weight: 600; color: #50DFCA; margin: 20px 0;"><span style="color: #000000; font-weight: 300;">Hola,</span><br> ${name}</h1>` : '<h1 style="font-size: 35px; line-height: 1; font-weight: 600; color: #50DFCA; margin: 20px 0;"><span style="color: #000000; font-weight: 300;">Bienvenido a,</span><br> Rogans App</h1>'}
                                <p style="font-size: 12px; color: #909090; margin-top: 60px;">Tu código de descuento:</p>
                                <p style="font-size: 24px; font-weight: 500; color: #909090; margin-top: 4px; padding: 10px; border: 1px solid #C0C0C0; border-radius: 12px; display: inline-block;">${codigo}</p>
                            </td>
                            <td align="center" valign="top" class="hide">
                                <img src="https://rogansya.com/rogans-app/assets/estetoscopio.png" alt="estetoscopio" style="max-width: 300px;">
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colspan="3" align="center">
                                <div class="social-icons">
                                    <a href="https://www.instagram.com/rogans.formula/"><img src="https://rogansya.com/rogans-app/assets/instagram.png" alt="Instagram" style="width: 18px; height: 18px;"></a>
                                    <a href="https://www.facebook.com/Rogansmen"><img src="https://rogansya.com/rogans-app/assets/facebook.png" alt="Facebook" style="width: 18px; height: 17px;"></a>
                                    <a href="https://www.tiktok.com/@MS4wLjABAAAAaxxbTVy9DSGGwuc03tcTTTmmMjBVnfeA_rKO1txVEKUhxraj70zn9tdnfAYWJVZs"><img src="https://rogansya.com/rogans-app/assets/tiktok.png" alt="TikTok" style="width: 18px; height: 16px;"></a>
                                    <a href="https://www.youtube.com/@rogans5984"><img src="https://rogansya.com/rogans-app/assets/youtube.png" alt="YouTube" style="width: 18px; height: 18px;"></a>
                                    <a href="https://www.linkedin.com/company/rogans/"><img src="https://rogansya.com/rogans-app/assets/linkedin.png" alt="LinkedIn" style="width: 15px; height: 14px;"></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" align="center" style="padding-bottom: 20px;">
                                <p class="footer-text" style="padding: 0;">© 2024 ROGANS. Derechos reservados</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </body>
        </html>
    `,
      }

    }
    console.log(``)
    return await addDoc(collectionRef, emailContent)
  } catch (error) {
    console.log('error', error)
  }


}


export async function sendEmailCodePromotionStatus(email: any, status: boolean, name:any) {

  const state = `${status ? "Aprobado" : "Rechazado"}`

  try {
    const collectionRef = collection(db, 'mail');
    const emailContent = {
      to: [email],
      message: {
        from: 'ROGANS 🩺',
        subject: "RogansApp pagos",
        html: `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style type="text/css">
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F5F5F5;
        }
        .button {
            background-color: #009688;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            font-size: 16px;
        }
        .social-icons img {
            width: 24px;
            height: auto;
            margin-right: 10px;
        }
        .footer-text {
            font-size: 12px;
            color: #878787;
        }
        @media screen and (max-width: 600px) {
            .hide {
                display: none;
            }
            .mobile-p {
                padding: 20px 38px !important;
            }
        }
    </style>
</head>
<body>
    <center>
        <table border="0" cellspacing="0" cellpadding="0" style="background-color: #FCFCFC; margin-top: 30px; border-radius: 25px; max-width: 600px; width: 100%;">
            <tbody>
                <tr>
                    <td colspan="3" align="center" valign="top" style="padding-top: 40px;">
                        <img src="https://rogansya.com/rogans-app/assets/logo.png" alt="logo" style="max-width: 150px;">
                    </td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td style="width: 35px;" class="hide"></td>
                    <td align="left" valign="middle" style="padding: 20px;" class="mobile-p">
                        <h1 style="font-size: 35px; line-height: 1; font-weight: 600; color: #50DFCA; margin: 20px 0;"><span style="color: #000000; font-weight: 300;">Hola,</span><br> ${name ? name : ''}</h1>
                        <p style="font-size: 20px; color: #909090; margin-top: 60px; margin-bottom: 0;">Tu pago fue:</p>
                        <p style="font-size: 28px; font-weight: 500; color: ${state == 'Aprobado'  ? `#50DFCA` : `#ea8383`}; margin-top: 4px; display: inline-block;">${state}</p>
                    </td>
                    <td align="center" valign="top" class="hide">
                        <img src="https://rogansya.com/rogans-app/assets/estetoscopio.png" alt="estetoscopio" style="max-width: 300px;">
                    </td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td colspan="3" align="center">
                        <div class="social-icons">
                            <a href="https://www.instagram.com/rogans.formula/"><img src="https://rogansya.com/rogans-app/assets/instagram.png" alt="Instagram" style="width: 18px; height: 18px;"></a>
                            <a href="https://www.facebook.com/Rogansmen"><img src="https://rogansya.com/rogans-app/assets/facebook.png" alt="Facebook" style="width: 18px; height: 17px;"></a>
                            <a href="https://www.tiktok.com/@MS4wLjABAAAAaxxbTVy9DSGGwuc03tcTTTmmMjBVnfeA_rKO1txVEKUhxraj70zn9tdnfAYWJVZs"><img src="https://rogansya.com/rogans-app/assets/tiktok.png" alt="TikTok" style="width: 18px; height: 16px;"></a>
                            <a href="https://www.youtube.com/@rogans5984"><img src="https://rogansya.com/rogans-app/assets/youtube.png" alt="YouTube" style="width: 18px; height: 18px;"></a>
                            <a href="https://www.linkedin.com/company/rogans/"><img src="https://rogansya.com/rogans-app/assets/linkedin.png" alt="LinkedIn" style="width: 15px; height: 14px;"></a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center" style="padding-bottom: 20px;">
                        <p class="footer-text" style="padding: 0;">© 2024 ROGANS. Derechos reservados</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </center>
</body>
</html>

    `,
      }

    }
    console.log(``)
    return await addDoc(collectionRef, emailContent)
  } catch (error) {
    console.log('error', error)
  }


}


