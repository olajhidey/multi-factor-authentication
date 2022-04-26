require("dotenv").config()

const auth = {
    username: process.env.PROJECT_ID,
    password: process.env.API_TOKEN
}
const axios = require("axios")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const spaceName = process.env.SPACE_NAME

const apiUrl = `https://${spaceName}.signalwire.com/api/relay/rest/mfa/sms`
const voiceUrl = `https://${spaceName}.signalwire.com/api/relay/rest/mfa/call`

let sid = ""

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 3000

app.use(express.static('frontend'))

app.post('/api/send-sms', (req, res) => {

    const {phoneNumber} = req.body

    let sender = process.env.SENDER_PHONE_NUMBER
    let senderMessage = "Your personal Authorization Code is shown below (Note Code expires in 3mins) : "
    axios.post(apiUrl, {
        to: phoneNumber,
        from: sender,
        message: senderMessage,
        token_length: 6,
        valid_for: 430
    }, {auth}).then((response) => {
        sid = response.data.id
        return res.json({"message": "OTP sent successfully", "data": response.data})
    }, (error) => {
        return res.json({"message": "An Error Occurred", "status": error.response.status})
    })

})

app.post('/api/voice', (req, res) => {
    const {phoneNumber} = req.body

    let sender = process.env.VOICE_PHONE_NUMBER
    let senderMessage = "Your Personal Authorization Code is"

    axios.post(voiceUrl, {
        to: phoneNumber,
        from: sender,
        message: senderMessage,
        token_length: 6,
        valid_for: 430
    }, {auth}).then(response => {
        sid = response.data.id
        return res.json({"message": "OTP has been sent successfully", "data": response.data})
    }, error => {
        return res.json({"message": error.message, "status": error.response.status})
    })
})

app.post('/api/token', (req, res) => {

    const {token} = req.body

    const mfaUrl =  `https://${spaceName}.signalwire.com/api/relay/rest/mfa/${sid}/verify`
    axios.post(mfaUrl, {token:token}, {auth}).then(response => {
        return res.json({"message": "Token verified successfully", "data": response.data, "status": 200})
    }, error=> {
        return res.json({"message": error.message, "status": error.response.status})
    })

})

app.listen(port, () => {
    console.log(`This app listening to port ${port}`)
})


