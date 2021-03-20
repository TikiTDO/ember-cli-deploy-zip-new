# ember-cli-deploy-zip-new

> This ember addon will zip the dist directory of your project.

It outputs an a zip file in a target directory.

**N.B.** If the file already exists then it will automatically delete it and create a new one.

## Quick Start


To get up and running quickly, do the following:

* Ensure ember-cli-deploy-build is installed and configured.

* Install this plugin

```
$ ember install ember-cli-deploy-zip-new
```

* Place the following configuration into config/deploy.js

```js
ENV["zip-new"] = {
  gitignoreFilePath: "<path-to-optional-gitignore-file>",
  targetFile: "<name-of-the-zip-file>", // Defaults to "[deployTarget].zip"
  targetPath: "<path-where-zip-will-be-created>",
}
```

* Run the pipeline

```
$ ember deploy [deployTarget]
```


## License

Copyright (c) 2016, Aesop Wolf <aesopwolf@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
