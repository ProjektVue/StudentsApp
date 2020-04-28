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

1. git checkout master # you can avoid this line if you are in master...
2. Run `npm run build` # build production package
3. Run `cp 404.html ./dist/` # Copy 404.html file for redirection
4. git subtree split --prefix dist -b {version} # create a local gh-pages branch containing the splitted output folder
5. git push -f origin {version}:gh-pages # force the push of the gh-pages branch to the remote gh-pages branch at origin
6. git branch -D {version} # delete the local gh-pages because you will need it: ref

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
