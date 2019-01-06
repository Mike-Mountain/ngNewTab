# ChromeNewTab

ChromeNewTab (or ngNewTab) is a starter page for a new tab built as a Chrome extension. 

Feel free to fork the project.

## Usage

The API for this project can be found [here](https://github.com/Mike-Mountain/ngNewTabApi).
The project uses Firebase for authentication, so if you're going to use it make sure you've set up a project on your firebase console and put the config object into your environments folder as decribed [here](https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md).

Test on your local development server with `ng serve`. 

Once you're happy, run the Build with `ng build`. In the `app` folder, you'll find a `manifest.json`
file. Edit as you wish and then copy that file into your built project inside your `dist` folder.

To install, open up `chrome://extensions` in your (Chrome obviously) browser. At the top of the page 
you'll find a toggle switch called 'developer mode'. 
Toggle that switch and use the new `load unpacked` button to upload the project files. 

Open a new tab and off you go!

***
### Disclaimer: This app is *__NOT__* a complete app. There is *alot* of work that still needs to be done. 
***

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
