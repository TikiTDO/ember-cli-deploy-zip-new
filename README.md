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


*Here's how my startup flow looks*

My npm scripts from my root package.json:

```json
"scripts": {
  "build": "ember build",
  "fastboot-server": "node index.js",
  "start": "npm run build && npm run fastboot-server",
  "test": "ember test"
}
```

And my `index.js` is an expansion of this boilerplate:

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

## Summary

I'd recommend this deployment flow if you're using the ember-fastboot-server middleware.

This is just one way of deploying ember-fastboot apps that are using the Express middleware. If you have a different way of doing it I'd love to hear about!

## License

Copyright (c) 2016, Aesop Wolf <aesopwolf@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
