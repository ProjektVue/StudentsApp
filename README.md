# students-app

> Portal społecznościowy dla studentów

## Setup project

1. Install dependencies

`npm install`

2. Copy `env.local.sample` to `env.local` and add API_KEY

## Requirements

nodejs12 nodejs installed

## Development

Run `npm run serve`

## Deployment

Application is deployed on GitHub pages under https://projektvue.github.io/StudentsApp/

To deploy:

1. Create new branch with deployment version: `git checkout -b {version}`
2. Run `npm run build`
3. Add dist folder and commit: `git add dist -f && git commit -m {version}`
4. Push dist folder to `gh-pages` branch: `git subtree push --prefix dist origin gh-pages`

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
