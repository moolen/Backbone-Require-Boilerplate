SampleApp
=========================

demo running [here](http://moolen.aries.uberspace.de/boilerplate/)

## Setup

> install grunt and dependencies
	```npm install```
> inside the root dir start the server with
	```node ./server/server.js```

## Environment Settings
Run the node server with 
	```NODE_ENV=production node ./server/server.js```
or
	```NODE_ENV=development node ./server/server.js```
	(this triggers to load minified js, the appUrl etc.)
	
## GruntJS is awesomeness
> You can use the Grunt.js build task to concat and minify the Javascript AMD Modules and libraries. Also the .less code gets compiled, concatenated and minified.

> Watch for changes in app.less, recompiles the less, concatenates and minifies the source 
	```grunt watch```

> Build the project: compile, concat and minify less/css and JS in your project. Be sure to change the appUrl in ./server/config/environment.js (app.configure('production')\[...\]) to your production url.
	```grunt build```