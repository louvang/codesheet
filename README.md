# [Codesheet](https://codesheet.herokuapp.com/)

Codesheet is a note-taking app for developers. Devs can write notes using Markdown or HTML and share these notes with peers. These notes, referred to as "sheets", are categorized, tagged, and searchable.

<p align="center"><a href="https://codesheet.herokuapp.com/" target="_blank"><img src="https://raw.githubusercontent.com/louvang/codesheet/main/client/src/assets/preview.gif" alt="Codesheet" width="750px" /></a></p>

## How To

You can view a demo account of Codesheet by [logging in](https://codesheet.herokuapp.com/login) with the following information:

**Email:** demo@codesheet.com
**Password:** Demo1234

By logging in, you can add new sheets, edit sheets, and add new categories to the account. You can also view a user and their sheets without logging in. [View Demo account's sheets](https://codesheet.herokuapp.com/613fe707debe5629ae81112e/view-all-sheets).

## About Code

The code uses the MERN stack (MongoDB, Express, React, NodeJS). Authentication is through Passport and does not yet use email confirmation to validate accounts. Data models are stored into MongoDB. Requests and responses for data are then handled by a REST API architecture with NodeJS.

I spent a lot of time on authentication and made a [separate repo](https://github.com/louvang/mern-auth-heroku) for the bones of MERN authentication specifically with Heroku deployment. It was particularly difficult since there were no tutorials on how to tie Passport authentication with React's more recent method of implementing Redux.

## Todo

- [ ] Redirect user to previous private route after logging in
- [ ] Implemeent account verification with email confirmation
- [ ] Allow users to login with username
- [ ] Settings page for users to edit their info
- [ ] Preview text for pages with lists of sheets (SearchResults.js, AllSheets.js)
- [ ] A page to view all categories
- [ ] A page to view all tags
