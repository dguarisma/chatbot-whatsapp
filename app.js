require('dotenv/config');
const { createBot, MemoryDB, createProvider, addKeyword, createFlow, EVENTS } = require('@bot-whatsapp/bot');
const { BaileysProvider } = require('@bot-whatsapp/provider-baileys');
const OpenAI = require('openai');

const { generatePrompt, containsSalesKeywords } = require(`./prompt.js`);
const searchProduct = require('./fetch.js')
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,

});

const main = async () => {
    const flowPrincipal = addKeyword(EVENTS.WELCOME)
        .addAction(async (_, { flowDynamic }) => {
            const prompts = generatePrompt(_.name);

            let content = _.body;
            console.log(containsSalesKeywords(_.body)?.additionalWord);
            console.log(containsSalesKeywords(_.body)?.isSalesQuestion);
            /*     if (containsSalesKeywords(_.body)?.additionalWord !== null && containsSalesKeywords(_.body)?.isSalesQuestion) {
                    await flowDynamic('Dame un momento para consultar por el producto...');
                    const product = await searchProduct(containsSalesKeywords(_.body)?.additionalWord);
                    content = JSON.stringify(product);
                } */
            const text = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-16k',
                temperature: 0,
                // max_tokens: 326,
                top_p: 0,
                frequency_penalty: 0,
                presence_penalty: 0,
                messages: [{
                    role: 'system',
                    content: prompts
                },
                { role: 'user', content },
                {
                    role: 'user',
                    content: `El nombre del cliente es ${_.name}`
                }],
            });
            return flowDynamic([{ body: text.choices[0].message.content, delay: 100 }]);
            /*    } else {
                   const text = await openai.chat.completions.create({
                       model: 'gpt-3.5-turbo-16k',
                       temperature: 0,
                       // max_tokens: 326,
                       top_p: 0,
                       frequency_penalty: 0,
                       presence_penalty: 0,
                       messages: [{
                           role: 'system',
                           content: prompts
                       },
                       { role: 'user', content: _.body },
                       {
                           role: 'user',
                           content: `El nombre del cliente es ${_.name}`
                       }],
                   });
   
                   return flowDynamic([{ body: text.choices[0].message.content, delay: 100 }]);
               } */
        })


    const adapterFlow = createFlow([flowPrincipal])
    const provider = createProvider(BaileysProvider)

    await createBot({
        database: new MemoryDB(),
        provider,
        flow: adapterFlow
    }, { extensions: { openai } })

}

main()