# lib-kit [![Build Status](https://secure.travis-ci.org/stefanpenner/lib-kit.png?branch=master)](http://travis-ci.org/stefanpenner/lib-kit)

Kitchen-sink starter kit for building browser/node libraries. Extracted
from [rsvp.js](https://github.com/tildeio/rsvp.js)

Building:
---------

```sh
grunt
```

developing:
-----------

the following will monitor your lib code, tests and vendor'd
dependencies, and rebuild as needed. Additionally, navigating to
http://127.0.0.1:8000, will display the browser tests.

```sh
grunt server           # http://127.0.0.1:8000/
PORT=9292 grunt server # http://127.0.0.1:9292/
```

Testing:
--------

```sh
grunt test         # headless testing (phantom + node)
grunt test:node    # node
grunt test:phantom # phantom
grunt server       # browser (navigate to http://127.0.0.1:8000)
```

Releasing
---------

- to bower (via github.com/components/<repo_name>)
- npm

```sh
grunt build-release release-it:0.0.1
```

Adding dependencies:
--------------------

- npm

```sh
npm install <package_name> --save     # runtime dependency
npm install <package_name> --save-dev # dev-dependency
```

- bower (todo)
