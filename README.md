# prismjs-components-importer

This is a helper to import `prismjs`.

## problem

Each language definition file in `prismjs` may depend on others. Therefore, depending on the order in which you import them, errors may occur.

So `prismjs` team provides a way to load languages for each environment:

https://prismjs.com/#basic-usage-cdn

https://prismjs.com/#basic-usage-bundlers

https://prismjs.com/#basic-usage-node

Especially in a bundler environment such as webpack, babel is used to load language definitions. However, many people seem to `import` them directly by mistake:

```ts
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-arduino";
```

`prism-arduino.js` depends on `prism-cpp.js`, so `prism-cpp.js` must be imported before `prism-arduino.js`.

## solution

`prismjs-components-importer` provides a set of modules that import the language definition files in the correct order.

For example, the contents of `prismjs-components-importer/esm/prism-arduino.js` are as follows:

```ts
import "prismjs";
import "./prism-cpp";
import "prismjs/components/prism-arduino";
```

So if you only import this module, you will be able to use the arduino language definitions.

Now you only need to import the language definitions you really want!

Also, if you want to load all the language definitions, you can do so by simply importing `index.js`:

```ts
import "prismjs-components-importer/esm";
```

## Install

```
npm install prismjs-components-importer
```

## Usage examples

Import a specific language definition with CommonJS:

```ts
const Prism = require("prismjs");
require("prismjs-components-importer/cjs/prism-typescript");

Prism.highlight('const foo:string = "bar";', Prism.languages.ts, "ts");
```

Import all language definitions with CommonJS:

```ts
const Prism = require("prismjs");
require("prismjs-components-importer/cjs");

Prism.highlightAll();
```

Import a specific language definition with ES Modules:

```ts
import Prism from "prismjs";
import "prismjs-components-importer/esm/prism-typescript";

Prism.highlight('const foo:string = "bar";', Prism.languages.ts, "ts");
```

Import all language definitions with ES Modules:

```ts
import Prism from "prismjs";
import "prismjs-components-importer/esm";

Prism.highlightAll();
```

## LICENSE

MIT
