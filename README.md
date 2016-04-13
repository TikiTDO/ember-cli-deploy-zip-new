# ember-cli-deploy-zip

> This ember addon will zip the root directory of your project.

It outputs an `archive.zip` file in your root directory.

**N.B.** If you already have an `archive.zip` file then it will automatically delete it and create a new one.

The following files/folders are not zipped:

1. Anything in your `.gitignore` file
1. Files named `'.'` and `'..'`

## Quick Start

```
$ ember install ember-cli-deploy-zip
$ ember deploy
```

Then update your `.gitignore` file:
```
# .gitignore

archive.zip
```

## Use Case

I made this addon to suit my deployment needs:

1. I'm using [ember-fastboot](http://ember-fastboot.com/)
1. I'm using a custom Express server with the [ember-fastboot-server](https://github.com/ember-fastboot/ember-fastboot-server#middleware) middleware
1. My server lives in the root directory of my ember app as `index.js`
1. This addon zips the entire project
1. A separate addon uploads `archive.zip` to Elastic Beanstalk
1. I deploy my app as a Docker container
1. My Dockerfile handles installing my dependencies for my Express server AND subsequently my fastboot build via my npm scripts.


Here's my Dockerfile:
```Dockerfile
FROM node:4.4.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN npm install -g bower
RUN bower install --allow-root
RUN npm install -g ember-cli

CMD [ "npm", "start" ]

EXPOSE 8080
```

My npm scripts from my root package.json:

```json
"scripts": {
  "build": "ember build",
  "fastboot-install": "npm --prefix ./dist install ./dist",
  "fastboot-server": "node index.js",
  "start": "npm run build && npm run fastboot-install && npm run fastboot-server",
  "test": "ember test"
}
```

Finally, my `index.js` is an expansion of this boilerplate:

```js
var server = new FastBootServer({
  distPath: 'path/to/fastboot-dist'
});

var app = express();

app.get('/*', server.middleware());

var listener = app.listen(8080, function() {
  console.log('FastBoot is running');
});
```

Essentially I have two `npm install`s:

1. `npm install` that lives in my Dockerfile
  - This is for my custom Express server (index.js) that's running the ember-fastboot-server middleware
1. `npm run fastboot-install` in my package.json
  - The script itself looks weird (`npm --prefix ./dist install ./dist`)
  - This is because I'm actually running `npm install` on the package.json file that's located in the `/dist` folder
  - The `/dist` folder is first created from `ember build` (or in this case `npm run build` from the start script)


## Summary

I'd recommend this deployment flow if you're using the ember-fastboot-server middleware.

Even though I can recommend it, I'm not super excited about. So, if you have a different way of doing it I'd love to hear about!

And if you're using this addon for something not related to ember-fastboot I'm interested in hearing about your use case as well :)


## License

Copyright (c) 2016, Aesop Wolf <aesopwolf@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
