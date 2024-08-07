# to-do-list-backend

# init project

npm init -y

# init typescript

npm i -D typescript
npm i -D ts-node

then : npx tsc --init
in tsconfig.json:

{
"compilerOptions": {
"target": "es6",
"module": "commonjs",
"outDir": "./dist",
"strict": true,
"esModuleInterop": true
},
"include": [
"**/*.ts"
],
"exclude": [
"node_modules"
]
}

add in package.json scripts:

"build": "tsc -p tsconfig.json"

# launch project

npm i -d nodemon

then you can create server.ts at the root

add in package.json scripts:

"dev": "nodemon server.ts"

# for git

git init

add .gitignore :

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.prettierrc

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

