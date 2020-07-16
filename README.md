# Look mum, no bundlers

## Description

This a small example to showcase a single page application (in this case using Preact) that makes no use of bundlers.

You just import the needed dependencies and write your app. No configuration, no boilerplate code. That's it.

## Quick Start

Run it with:

`npx serve`

Done :)

## Motivation

Are you tired of

* having so much boilerplate code, or
* so many configurations,
* etc.

...when you simply want to create `<YOU_NAME_IT>` and run it on your browser as fast as possible?

That's what you would usually do, right?

```javascript
import React from 'react';

/* TypeError: Failed to resolve module specifier 'react' */
```

The code above is not going to work on the browser, since importing by bare module specifiers is not supported (yet).

Let's get the dependency directly from `node_modules` then:

```javascript
import React from '/node_modules/react/index.js';

/* ReferenceError: process is not defined */
```

Oops. We are not using Node.js, so `process.env` will not be accessible on the browser? :(

**So, why not just use a CDN like UNPKG?**
