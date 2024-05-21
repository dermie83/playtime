README

Full Stack Development 1 - assignment 2
This is the source for a module on the Higher Diploma in Computer Science.

The course is deployed here:

https://tutors.dev/course/full-stack-1-2023
The course is built using Tutors


This assignment objective is to gain experience using the Hapi Node. js framework for building scalable web applications and APIs.

The scope of the project is to develop a dynamic app on a the subject of (POI) points of interest.

My POI is on Irish Lighthouses. 

The application will allow users to create a groups that contain various lighthoues around Ireland.
The user will also be able to add descriptive features about each lighthouse e.g. location, name, daymark, character etc.
There will also be an interactive google map showing lighthouse location by coordinates along with a table showing live weather report.

A live Demo of the App can be viewed here:

Glitch Link:

Technology Stack
Backend: Node.js, Hapi.js
Database: Mongo (Cloud Atlas) (Can switch to Mem or json db)
Hosting: Heroku & Glitch
Templating: Handlebars
API Validation: Joi
API Documentation: OpenAI / Swagger
Authentication: JSON Web Tokens (JWT)
Styling: Bulma CSS
Testing: Mocha, Chai

Dependencies
@hapi/boom: Creates HTTP-friendly error objects.
@hapi/cookie: Cookie-based session management for Hapi.js.
@hapi/hapi: A rich framework for building applications and services (server).
@hapi/inert: Static file and directory handlers for Hapi.js.
@hapi/vision: Templates rendering support for Hapi.js.
chai: A BDD / TDD assertion library for node and the browser.
cloudinary: Provides API for image and video upload, manipulation, optimization, and delivery.
dotenv: Loads environment variables from a .env file into process.env.
googlemaps: Povide API display google maps.
handlebars: A simple templating language.
hapi-auth-jwt2: JWT authentication for Hapi.js applications.
hapi-swagger: A Swagger interface for Hapi.js applications.
joi: Object schema description language and validator for JavaScript objects.
jsonwebtoken: An implementation of JSON Web Tokens.
lowdb: Small local JSON database powered by Lodash (supports Node, Electron and the browser).
mais-mongoose-seeder: Mongoose seeder allows you to seed your MongoDB database with JavaScript objects.
mongodb: The official MongoDB driver for Node.js.
mongoose: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
uuid: Simple, fast generation of RFC4122 UUIDS.

DevDependencies:
axios: Promise based HTTP client for the browser and node.js.
eslint: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
eslint-config-airbnb-base: This package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
eslint-config-prettier: Turns off all rules that are unnecessary or might conflict with Prettier.
eslint-plugin-import: ESLint plugin with rules that help validate proper imports.
mocha: A feature-rich JavaScript test framework running on Node.js and in the browser.
nodemon: A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
prettier: An opinionated code formatter.
Installation
Clone this Repository

  git clone 
To get a copy of the project running on your system, navigate to the project directory in a command prompt/shell and run the following:

  npm install
This will install all dependencies in package-lock.json

After dependency installation has completed run

npm run start
This will load the application and start a local server on port 4000.

http://localhost:3000/
Contact
Your Name - Dermot Madsen

Project Link: 

