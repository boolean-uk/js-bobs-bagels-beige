require('dotenv').config()
const accountSid = process.env.sid
const authToken = process.env.token
const client = require('twilio')(accountSid, authToken)

class TwilioService {
  sendMessage (testReceipt, deliveryTime, contactNumber) {
    console.log(client)
    client.messages
      .create({
        body: `${testReceipt}\nEstimated Delivery: ${deliveryTime}`,
        from: '+447360494355',
        to: `${contactNumber}`
      })
      .then(message => console.log(message.status))
  }
}

module.exports = TwilioService
