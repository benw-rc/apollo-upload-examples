# Oligo Probe Design Form User Interface

## Overview

**TODO**

## Prerequisites


### yarn

The Yarn project recommends you not install via npm, nor is the Ubuntu-suggested
`cmdtest` package the right way.

Instead, see: https://yarnpkg.com/lang/en/docs/install


## Generate the .env file

This project makes use of `./.env` that must be generated.

To generate a `.env` file for the development environment, simply run

``` sh
yarn install
yarn dotenvi -s development
```

The `.env` file is in `.gitignore` and **must** be created by the developer
before the application can run.

For other environments, run `yarn dotenvi -s <environment>` and confirm `./.env`
was generated.

The supported environments are defined in the `env.yml` file on the root of the
project.

## Build/Deploy

Ensure the node version in the argus conda environment is not in your path.

First run `yarn cleanup`.

This project is built on yarn, so to install dependencies and build, simply run
from this directory:

```sh
yarn install && yarn build;
```

The app can be served with a nodejs devlopment server
```sh
yarn start
```

# Testing

The module's unit tests can be run with `yarn test`.  Individual tests can be
run with `yarn test <path_to_module>`, e.g. `yarn test
src/modules/argus_ws/api/ws_manager.spec.js`

## Design

**TODO**: Include some text about the design, or add links to design document.

<!-- Local Variables: -->
<!-- fill-column: 80 -->
<!-- End: -->
