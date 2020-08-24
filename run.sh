#!/bin/bash

i() {
  npm i --no-package-lock
}

clean() {
  rm -rf dist
  rm -rf node_modules
}

start() {
  i
  npm run start
}

"$@"
