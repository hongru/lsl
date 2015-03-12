# lsl

list all folders and files with an awesome show!

## Usage

#### Cli

```
$ npm install -g lsl
```

```
  Usage: lsl [options]

  Options:

    -h, --help                    output usage information
    -V, --version                 output the version number
    -c, --collapse <dir1/,dir2/>  the dirs you want to collapse
```

```
$ lsl
```
you will get console to show dir and file relationships like this

```
lsa/
  ├─┬ .git/
  | ├── HEAD
  | ├── branches/
  | ├── config
  | ├── description
  | ├─┬ hooks/
  | | ├── applypatch-msg.sample
  | | ├── commit-msg.sample
  | | ├── post-update.sample
  | | ├── pre-applypatch.sample
  | | ├── pre-commit.sample
  | | ├── pre-push.sample
  | | ├── pre-rebase.sample
  | | ├── prepare-commit-msg.sample
  | | └── update.sample
  | ├─┬ info/
  | | └── exclude
  | ├─┬ objects/
  | | ├── info/
  | | └── pack/
  | └── refs/
  | | ├── heads/
  | | └── tags/
  ├── .gitignore
  ├─┬ bin/
  | └── lsl.js
  ├── index.js
  ├─┬ node_modules/
  | ├─┬ chalk/
  | | ├── index.js
  | | ├── license
  | | ├─┬ node_modules/
  | | | ├─┬ .bin/
  | | | | ├── has-ansi
  | | | | ├── strip-ansi
  | | | | └── supports-color
  | | | ├─┬ ansi-styles/
  | | | | ├── index.js
  | | | | ├── license
  | | | | ├── package.json
  | | | | └── readme.md
  | | | ├─┬ escape-string-regexp/
  | | | | ├── index.js
  | | | | ├── license
  | | | | ├── package.json
  | | | | └── readme.md
  | | | ├─┬ has-ansi/
  | | | | ├── cli.js
  | | | | ├── index.js
  | | | | ├── license
  | | | | ├─┬ node_modules/
  | | | | | ├─┬ ansi-regex/
  | | | | | | ├── index.js
  | | | | | | ├── license
  | | | | | | ├── package.json
  | | | | | | └── readme.md
  | | | | | └── get-stdin/
  | | | | | | ├── index.js
  | | | | | | ├── package.json
  | | | | | | └── readme.md
  | | | | ├── package.json
  | | | | └── readme.md
  | | | ├─┬ strip-ansi/
  | | | | ├── cli.js
  | | | | ├── index.js
  | | | | ├─┬ node_modules/
  | | | | | └── ansi-regex/
  | | | | | | ├── index.js
  | | | | | | ├── license
  | | | | | | ├── package.json
  | | | | | | └── readme.md
  | | | | ├── package.json
  | | | | └── readme.md
  | | | └── supports-color/
  | | | | ├── cli.js
  | | | | ├── index.js
  | | | | ├── license
  | | | | ├── package.json
  | | | | └── readme.md
  | | ├── package.json
  | | └── readme.md
  | └── commander/
  | | ├── History.md
  | | ├── LICENSE
  | | ├── Readme.md
  | | ├── index.js
  | | ├─┬ node_modules/
  | | | └── graceful-readlink/
  | | | | ├── .npmignore
  | | | | ├── .travis.yml
  | | | | ├── LICENSE
  | | | | ├── README.md
  | | | | ├── index.js
  | | | | └── package.json
  | | └── package.json
  ├── package.json
  ├─┬ src/
  | └── lsl.js
  └── test/
```

if you want to collapse some folders such as `node_modules/` `.git/` , you can use the option `-c --collapse`

```
$ lsl -c node_modules/,.git/ ./
```

```
./
  ├── .git/
  ├── .gitignore
  ├─┬ bin/
  | └── lsl.js
  ├── index.js
  ├── node_modules/
  ├── package.json
  ├─┬ src/
  | └── lsl.js
  └── test/
```

## Api

```javascript
var lsl = require('lsl');
var logstr = lsl(process.cwd(), {
    collapseDirs: ['node_modules/', '.git']
});

console.log(logstr);

```