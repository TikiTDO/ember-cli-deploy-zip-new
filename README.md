# ember-cli-deploy-zip

> This ember addon will zip the dist directory of your project.

It outputs an `archive.zip` file in your root directory.

**N.B.** If you already have an `archive.zip` file then it will automatically delete it and create a new one.

The following files/folders are not zipped:

1. Anything in your `.gitignore` file
1. Files named `'.'` and `'..'`

## Quick Start

```
$ ember install ember-cli-deploy-zip-new
$ ember deploy <environment>
```

You should also update your `.gitignore` file:
```
# .gitignore

archive.zip
```

## Use Case

I copied this addon from https://github.com/aesopwolf/ember-cli-deploy-zip to suit my deployment needs:

1. This addon zips the dist project
1. A separate addon uploads `archive.zip` to Elastic Beanstalk


## License

Copyright (c) 2016, Aesop Wolf <aesopwolf@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
