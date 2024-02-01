# Simple Tasks (with Vite)

Describes a configuration to use Vite with Meteor with the same approach explained in [nachocodoner/simpletasks-webpack](https://github.com/nachocodoner/simpletasks-webpack).

Built using as a small example described in this repository: [fredmaiaarantes/simpletasks](https://github.com/fredmaiaarantes/simpletasks).

Demo: SOON

Original: https://simpletasks.meteorapp.com


## Motivation

Over the years, Meteor has been instrumental in supporting numerous companies and individuals in building their products, providing a tool that facilitates the process of product development and delivery. However, as technology advances and becomes more sophisticated, it is a must for us to embrace new tools that can enhance security, performance, and development speed to adapt ourselves with the growing demands of our products.

One area where Meteor has yet to evolve significantly is its bundler. Introducing features like Tree Shaking would be highly advantageous for any expanding project. Although [Meteor has made attempts to include it in the core](https://github.com/meteor/meteor/pull/11164), proper implementation has not arrived yet. In contrast, other bundlers like Vite have already integrated such features effectively, pushing other platforms to evolve rapidly while Meteor stays behind. Moreover, other bundlers have adopted a range of plugins that empower developers to deliver solutions more efficiently, providing clear benefits for those familiar with these tools.

This repository aims to enrich Meteor projects with a straightforward yet powerful solution, enabling developers to incorporate the latest bundler trends and capabilities into their projects as needed.

The decision to choose Vite is based on its robustness, wide usage, and continuous maintenance, along with the abundance of extensions and features it offers. However, it is important to note that the same solution can be adapted to other popular bundlers with some configuration adjustments. I provide you here an example of Vite configuration in this repository for your reference.

## How

The solution is straightforward: mix the power of both Meteor and Vite to construct your app.

- Let Vite to compile just your app code, taking advantage of all the bundler benefits it offers.
- Let Meteor insert its modules into the app code.

This approach allows you to enjoy the best of both worlds.

With Vite, your app bundle becomes lean, yet robust and secure, ready to go live with confidence. By incorporating Meteor, you unlock a high amount of powerful features, including reactivity, a simple API, data isomorphism, a collection of well-crafted packages for rapid development, an so on.

- The `vite.config.js` file contains essential configurations for both client and server environments, covering development and production settings.
- The `ui/main.jsx` and `api/main.js` files are designated as entry points for the app code and are properly configured in Vite to facilitate the app's compilation.
- Two app artifacts are generated after Vite compilation: `client/client.js` and `server/server.js`. These files become the new entry points for the Meteor app (`meteor/mainModule` in `package.json`), allowing it to recognize and utilize the Meteor packages properly.

The expected outcome is achieved: the app code is compiled by Vite, and then Meteor recompile the Vite application, making it fully compatible with the Meteor core and packages.

The `.meteorignore` file is configured for Meteor to exclude the app code located within the `ui/` and `api/` directories for the watching files development processes. Vite exclusively handles the compilation and management of these folders now.

## Hands-on

The scripts are described in the `package.json` and those enforce the proper development experience and production deploy.

### Install dependencies

```bash
meteor npm install
```

### Running the app

```bash
meteor npm start
```

### Visualize the app bundles

```bash
meteor npm run visualize
```

On `http://localhost:3000` you still have the information gathered by Meteor bundle-visualizer package.

With `http://localhost:8888` (client) and `http://localhost:8889` (server) you have the bundle information of the app code bundled by Vite thanks to the [`Vite-bundle-analyzer`](https://github.com/Vite-contrib/Vite-bundle-analyzer).

### Cleaning up you local db

```bash
meteor reset
```

### Cleaning up cache

To clean the Meteor's and Vite's cache, including node_modules.

```bash
meteor npm run clean
```

Useful to avoid compilation errors caused by the state of caches. Don't forget to `meteor npm install` again.

### Deploy to Galaxy with free MongoDB

```bash
meteor npm run deploy -- --free --mongo
```
