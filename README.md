# Bot de WhatsApp con OpenAI

Este proyecto es un bot de WhatsApp que utiliza la plataforma OpenAI para generar respuestas automáticas basadas en el contenido recibido. 

## El bot se desarrollo utilizando Node.js y las siguientes dependencias:

- `dotenv`: Para la gestión de variables de entorno.
- `@bot-whatsapp/bot`: Para la creación del bot de WhatsApp.
- `@bot-whatsapp/provider-baileys`: Proveedor de servicios de WhatsApp para la comunicación.
- `openai`: Para la generación de respuestas utilizando modelos de inteligencia artificial.

## Descripción del Código

El archivo `app.js` contiene el código principal del bot. Aquí se inicializan las dependencias, se configura el flujo de conversación y se define la lógica para generar respuestas con OpenAI.

- El archivo `prompt.js` define la interacción de prompt para que el usuario establezca el diálogo. Este archivo es crucial para la comunicación bidireccional entre el bot y el usuario, ya que configura cómo se inicia y se mantiene la conversación.
- Se utiliza `dotenv` para cargar las variables de entorno, incluida la clave de API de OpenAI.
- Se define una función `main` asincrónica que configura el flujo de conversación del bot.
- El flujo principal se activa en eventos de bienvenida y utiliza OpenAI para generar respuestas contextuales basadas en el contenido del mensaje del usuario.
- Las respuestas generadas se envían de vuelta al usuario a través del flujo de conversación.

## Uso

Para ejecutar el bot, asegúrese de tener Node.js instalado y las dependencias del proyecto instaladas utilizando `pnpm install`.

Luego, ejecute el siguiente comando:

```bash 
pnpm run dev

```
{
  "name": "chatbotwhatsapp",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "author": "David Daniel Guarisma Lara (@dguarisma)",
  "license": "ISC",
  "scripts": {
    "dev": "node app.js"
  },
  "dependencies": {
    "@bot-whatsapp/bot": "0.1.3-alpha.13",
    "@bot-whatsapp/provider-baileys": "0.1.3-alpha.13",
    "dotenv": "^16.4.2",
    "node-fetch": "^3.3.2",
    "openai": "^4.27.0"
  }
}```