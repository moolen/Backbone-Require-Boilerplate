SampleApp
=========================

demo running [here](http://moolen.aries.uberspace.de/boilerplate/)

## Setup

install grunt and dependencies
	```npm install grunt grunt-contrib-less grunt-contrib-watch grunt-contrib-requirejs grunt-contrib-concat grunt-contrib-cssmin```

## Environment Settings
Run the node server with 
	```NODE_ENV=production node ./server/server.js```
or
	```NODE_ENV=development node ./server/server.js```

	
## Build process
> You can use the Grunt.js build task to concat and minify the Javascript AMD Modules and libraries. Also the .less code gets compiled, concatenated and minified.