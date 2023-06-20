const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.post('/message', function (req, res) {
    console.log(req.body);
    const msgFrom = req.body.From;
    const msgBody = req.body.Body;

    res.send(`
        <Response>
            <Message>
                Hello ${msgFrom}. You said: ${msgBody}
            </Message>
        </Response>
    `)
})

app.listen(3000)