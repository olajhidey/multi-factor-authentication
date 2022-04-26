## Multi-Factor Authentication using SignalWire Multi-Factor API

This is a simple Javascript web application that makes use of `express` to serve both backend and static file of this web application

### Prerequisite

- A [SignalWire](https://signalwire.com) account
- A valid Signalwire space
- NodeJs Environment
- Basic understanding of JavaScript

### Getting Started

- Clone the repository onto your local machine
- open up a terminal and run `npm install`
- Create a `.env` file and replicate values in the `.env.example` file
- start application by running `node index.js` or `nodemon index.js` if you have nodemon installed

### References

- [Creating a SignalWire space](https://developer.signalwire.com/apis/docs/signing-up-for-a-space)
- [SignalWire Multi-factor API reference (SMS)](https://developer.signalwire.com/apis/reference/request_mfa_sms)
- [SignalWire Multi-factor API reference (Voice)](https://developer.signalwire.com/apis/reference/request_mfa_call)