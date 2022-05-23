const express = require('express')
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
app.disable('etag');
const port = process.env.PORT || 3010
const smtpLogin = process.env.SMTP_LOGIN
const smtpPass = process.env.SMTP_PASSWORD

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: smtpLogin, // generated ethereal user
        pass: smtpPass, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/getMessage',  async (req, res) => {

    const {name, email, message} = req.body.values

   let info = await transporter.sendMail({
        from: 'Someone wants to contact',
        to: "veronikaullll1998@gmail.com",
        subject: "Portfolio",

        html: `<div>${name} send message: '${message}'. Contact via email : ${email}</div>`, // html body
    })
   res.send('ok');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})