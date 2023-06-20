require('dotenv').config()
const accountSid = process.env.sid
const authToken = process.env.token
const client = require('twilio')(accountSid, authToken)

client.message
  .create({
    body: `${testReceipt}\nEstimated Delivery: ${deilveryTime}`,
    from: '+447360494355',
    to: `${contactNumber}`
  })
  .then(message => console.log(message.status))
