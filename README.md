# GBBF
### Gulp - Browsersync - Bootstrap - Fontawesome

GBBF is a fast and easy tool for for generating HTML webpages with SASS, customizable bootstrap and scripts in TypeScript, all automatically minified and compiled in real time with Gulp and Browsersync

## How to get started?

Just clone this repo on your machine and run

```bash
npm install
```
for installing all the required packages to run GBBF, then, to start working just launch

```bash
gulp
```

and you will be able to write your code and see it dynamically updating on your browser window

---

#### Note

If your machine doesn't recognize the `gulp` command, make sure to have globally installed `gulp-cli` , run

```bash
npm install --global gulp-cli
```

## Gulp tasks

There are three main tasks in the gulpfile

1. `gulp style` that compile SASS and return CSS and minified CSS
2. `gulp scripts` that compile TypeScript and return JavaScript and minified JavaScript
3. `gulp serve` (launched as default action for `gulp` command) that run the prevoius functions, launch a local server and watch for file changes

## Where should I put my scripts and my style sheets?

* Scripts go in `scripts` folder, they can be both TypeScript or JavaScript, gulp will find, compile and minify them, destination folder is `app/js` for expanded JavaScript and TypeScript definitions, `app/js/min` for minified JavaScript
* Style Sheets go in `style` folder, they can be both SASS or CSS, gulp will find, compile and minify them, destination folder is `app/css` for expanded CSS, `app/css/min` for minified CSS
