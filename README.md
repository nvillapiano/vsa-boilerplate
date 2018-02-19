# VSADev Frontend Boilerplate
##### VSA Partners

An opinionated frontend boilerplate to build out your website's assets. For more details visit:

* [Boilerplate](https://bitbucket.org/vsapartners/vsadev-boilerplate-frontend)
* [Boilerplate Wiki](https://bitbucket.org/vsapartners/vsadev-boilerplate-frontend/wiki/Home)
* [Boilerplate Backlog](https://bitbucket.org/vsapartners/vsadev-boilerplate-frontend/addon/bitbucket-trello-addon/trello-board)
* [Boilerplate Issues](https://bitbucket.org/vsapartners/vsadev-boilerplate-frontend/issues?status=new&status=open)
* [Slack](https://vsapartners.slack.com/messages/C99PX6W8J/)

---
## Get Started

See [wiki](https://bitbucket.org/vsapartners/vsadev-boilerplate-frontend/wiki/Home) for more details.

---
## Requirements

* Python or Webserver - Your computer's python should be fine.
* Node
* Yarn
* Gulp

---
## Get Started

### Build website assets

```
$ yarn
$ yarn run watch # or yarn run build
```

### Start a web server

```
$ python -m SimpleHTTPServer 8080
```

### Other Tasks

```
# Build development version
$ yarn run build

# Build production version
$ yarn run build:production

# Build production version without linting. You sure? Fine.
$ yarn run build:production:allow-lint

# Lint
$ yarn run lint

# Lint Styles
$ yarn run lint:styles

# Lint Scripts
$ yarn run lint:scripts

# Tests. Right now just lints.
$ yarn test

# Run other Gulp Tasks
# For more gulp tasks see the gulpfile.js file in the `resources/assets/build/gulp` directory.
$ yarn run gulp psi
```

---

Generated from [VSADev Boilerplate - Frontend](https://bitbucket.org/vsapartners/vsadev-boilerplate-frontend). See additional [VSA Boilerplates](https://bitbucket.org/account/user/vsapartners/projects/VSADEV_BOILERPLATES).
