# students-app

> Social app for students

## Setup project

### Requirements

nodejs12 nodejs installed

### Setup

1. Install dependencies

`npm install`

2. Get `API_KEY` from https://opencagedata.com/
3. Copy `env.local.sample` to `env.local`
4. Add `API_KEY` from (https://opencagedata.com/) to env `VUE_APP_GEO_API_KEY`

### Development

Run `npm run serve`

### Deployment

Application is deployed on GitHub pages under https://projektvue.github.io/StudentsApp/

To deploy:

On unix based systems:
Run `sh deploy.sh`

## Features

- login and register
  - integration with gravatar - API for username autofill, avatars
  - integration with opencagedata (https://opencagedata.com/) for registration form city and country prefill
- adding and viewing events
- add user to friends
- chat with users
