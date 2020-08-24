#!/bin/bash

i() {
  npm i --no-package-lock
}

clean() {
  rm -rf dist
  rm -rf node_modules
}

start() {
  npm i --no-package-lock
  npm run start
}

"$@"
