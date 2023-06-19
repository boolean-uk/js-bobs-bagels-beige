// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC7d0edacf723d12693bbaf087a5ae0870'
const authToken = '51bb8e9a9a0f92eb23d4e9181028f219'
const client = require('twilio')(accountSid, authToken)

// client.messages
//   .create({
//     body: 'Message from Norik and Mantas from Twilio!!',
//     from: '+447360494355',
//     to: '+447555336254'
//   })
//   .then(message => console.log(message.status))
