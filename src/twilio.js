const Receipt = require('../src/receipt.js')

const accountSid = 'AC7c58fb9d8b144232bb704c036836aa4c';
const authToken = '6759dafacd17df2aa9b01b8a3d99eb1b';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: `Hey there, thank you for your order. Here is your ${Receipt}`,
        from: '+12178338475',
        to: '+351912121304'
    })
    .then(message => console.log(message.sid))
    .done();