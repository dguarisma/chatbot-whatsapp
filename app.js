require('dotenv/config');
const { createBot, MemoryDB, createProvider, addKeyword, createFlow, EVENTS } = require('@bot-whatsapp/bot');
const { BaileysProvider } = require('@bot-whatsapp/provider-baileys');
const OpenAI = require('openai');

const { generatePrompt } = require(`./prompt.js`);
const searchProduct = require('./fetch.js')
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,

});

const main = async () => {
    const flowPrincipal = addKeyword(EVENTS.WELCOME)
        .addAction(async (_, { flowDynamic }) => {
            const prompts = generatePrompt(_.name);
            let content = _.body;
            console.log(content);
            const text = await openai.chat.completions.create({
                // model: 'gpt-4-turbo-preview',
                model: 'gpt-3.5-turbo-0125',
                temperature: 0,
                max_tokens: 200,
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
                }]
            });
            console.log(text.choices[0]);
            return flowDynamic([{ body: text.choices[0].message.content, delay: 0 }]);

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