# Aforo Web

Reactjs application with:

- chakra-ui
- typescript
- urql
- urql code generator
- netlify
- deploy with dokku to DO droplet

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

TDF

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Right now we are adding the build folder to the git repo since we need it for the deploy to nginx base dokku app

## Netlify build

- all PR to dev/main will have a preview branch created, see the `checks` section in PR for more info
- dev branch will run cypress test and will me marked as a check
- dev branch is deployed to [dev.aforo](https://dev.aforo.website/)
- main branch is deployed to [app.aforo](https://app.aforo.website/)

## Dokku build

_Note: check if dropet is still online with repo owner before proceeding_

- add a `.static` file in the root folder and in the `.env` a `BUILDPACK_URL=https://github.com/dokku/buildpack-nginx` make sure there is a new line after this variable, the deploy will use the latest version of the nginx build configuration for static apps [more info](https://github.com/dokku/buildpack-nginx).
- create a remote repo for you local `git remote add dokku ${user:ip_server}:aforoweb`
  - dokku: default name for the user that executes the dokku commands on server
  - user: user to authenticate the droplet
  - ip_server: ip address of droplet
  - aforoweb: name assigned to the web app on droplet
  - also, you SSH KEY must be allowed on droplet for this to work since we are not using usr/pwd authentication
- after making changes and commit you can push this to the server with `git push dokku dev:master`
  - if you get an error with `rejected some refs...`, check if your ssh-agent is working and your ssh key is currently added "eval `ssh-agent -s`" and `s**sh-add ~/.ssh/${yourKey}`
  - this push the updates to the server **BUT NOT** to the github repository, make sure you still push them manually
