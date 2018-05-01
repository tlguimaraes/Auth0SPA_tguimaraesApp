# Author of this app

Thiago Guimaraes - thiago.guimaraes@gmail.com


# Auth0 JavaScript Login

This application shows how to add authentication in a SPA(Single Page application) with Auth0. This example from Thiago Guimares demonstrates Auth0's hosted login page which provides centralized authentication and call OAuth APIS to retrieve the authorization.

## Getting Started STEPS


1- [sign up](https://auth0.com) for your free Auth0 account and create a new client.
2- [dashboard](https://manage.auth0.com). Find the **domain** and **client ID** from the settings area and add the URL for your application to the **Allowed Callback URLs** box.
3-If you are serving the application with the provided `serve` library, that URL is `http://localhost:3000`.

Clone the repo or download it from the JavaScript quickstart page in Auth0's documentation.

```bash
cd Auth0SPA_tguimaraesApp
npm install
```

## Set the Client ID and Domain

If you download the sample from the quickstart page, it will come pre-populated with the **client ID** and **domain** for your application.
Replace where you have these:
domain: '[DOMAIN]',
clientID: '[CLIENT-ID]'

## Run the Application

The `serve` module provided with this sample can be run with the `start` command.

```bash
npm start
```

Then open your browser calling http://localhost:3000/


## Auth0 rules to be added on dashboard Application

Open JavaScript_rules_tobeAdded.txt and add them on Auth0 dashboard.

## Sample of app running

SPA-running.png

## Run the Application With Docker

In order to run the example with docker you need to have `docker` installed.

You also need to set the environment variables as explained [previously](#set-the-client-id-and-domain).

Execute in command line `sh exec.sh` to run the Docker in Linux, or `.\exec.ps1` to run the Docker in Windows.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Author

Thiago Guimaraes - thiago.guimaraes@gmail.com using [Auth0](https://auth0.com)  documentation.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.
