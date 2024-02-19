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
        html: `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f2f2f2; /* Fondo blanco */
          color: #000; /* Texto negro */
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff; /* Tarjeta blanca */
          padding: 20px;
          border: 1px solid #ccc; /* Bordes grises */
          border-radius: 10px;
          text-align: center; /* Centrar todo el contenido */
          color: #000; /* Texto negro */
        }
        .email-header img {
          max-width: 100px; /* Ajusta esto según el tamaño deseado de tu logo */
          margin-bottom: 20px;
        }
        .email-button {
          background-color: #28a745; /* Verde */
          color: #fff !important;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin-top: 20px;
        }
        .email-footer {
          color: #666; /* Texto gris */
          font-size: 14px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ccc; /* Línea superior gris */
        }
        .email-footer a {
          color: #000; /* Texto negro */
          text-decoration: none;
        }        
        </style>
      </head>
      <body>        
        <div class="email-container">
          <div class="email-footer">
            <h2 style="color: #28a745;">ROGANS</h2>   
            <h4 style="color: #28a745;">Bienvenido ${name ? name : email} </h4>        
            <p>Su codigo es ${codigo}.</p>
            Saludos<br>
            ROGANS HEALTH
            <p>&copy; 2024 ROGANS. Derechos reservados.</p>
          </div>
        </div>
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
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f2f2f2; /* Fondo blanco */
          color: #000; /* Texto negro */
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff; /* Tarjeta blanca */
          padding: 20px;
          border: 1px solid #ccc; /* Bordes grises */
          border-radius: 10px;
          text-align: center; /* Centrar todo el contenido */
          color: #000; /* Texto negro */
        }
        .email-header img {
          max-width: 100px; /* Ajusta esto según el tamaño deseado de tu logo */
          margin-bottom: 20px;
        }
        .email-button {
          background-color: #28a745; /* Verde */
          color: #fff !important;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin-top: 20px;
        }
        .email-footer {
          color: #666; /* Texto gris */
          font-size: 14px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ccc; /* Línea superior gris */
        }
        .email-footer a {
          color: #000; /* Texto negro */
          text-decoration: none;
        }        
        </style>
      </head>
      <body>        
        <div class="email-container">
          <div class="email-footer">
            <h2 style="color: #28a745;">ROGANS</h2>   
            <h4 style="color: #28a745;">Bienvenido ${name ? name : email} </h4>            
            <p>Su codigo de descuento es ${codigo}.</p>
            Saludos<br>
            ROGANS HEALTH
            <p>&copy; 2024 ROGANS. Derechos reservados.</p>
          </div>
        </div>
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
        subject: "Rogans notificaciones",
        html: `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f2f2f2; /* Fondo blanco */
          color: #000; /* Texto negro */
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff; /* Tarjeta blanca */
          padding: 20px;
          border: 1px solid #ccc; /* Bordes grises */
          border-radius: 10px;
          text-align: center; /* Centrar todo el contenido */
          color: #000; /* Texto negro */
        }
        .email-header img {
          max-width: 100px; /* Ajusta esto según el tamaño deseado de tu logo */
          margin-bottom: 20px;
        }
        .email-button {
          background-color: #28a745; /* Verde */
          color: #fff !important;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin-top: 20px;
        }
        .email-footer {
          color: #666; /* Texto gris */
          font-size: 14px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ccc; /* Línea superior gris */
        }
        .email-footer a {
          color: #000; /* Texto negro */
          text-decoration: none;
        }        
        </style>
      </head>
      <body>        
        <div class="email-container">
          <div class="email-footer">
            <h2 style="color: #28a745;">ROGANS</h2>   
            <h4 style="color: #28a745;">Bienvenido ${name ? name : email} </h4>            
            <p>Su pago fue ${state}.</p>
            Saludos<br>
            ROGANS HEALTH
            <p>&copy; 2024 ROGANS. Derechos reservados.</p>
          </div>
        </div>
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


