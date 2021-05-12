# Sandbox: Node

This is a back-end sandbox intended to be used for testing and experimenting with Sila.

## Security

**This project does not handle private keys in a secure manner.** It is **absolutely not** to be used as-is. Your project will need to integrate with a KMS in order to properly handle private keys. This project is simply a way for you to experiment with the Sila API in a Node environment.

## Setup

1. Clone the repo
2. Run `npm i`
3. Set up the "app information" section of your `.env.js` file based on `.env.example.js` in the home directory. This will require setting up an app using the Sila console (console.silamoney.com). The rest of the variables in this file will be manually populated as you make use of this sandbox.
4. You can now use `npm test` to run tests, which will hit the Sila sandbox API. Note that tests are not designed to be run all at once; you will need to make use of `only` and `skip`