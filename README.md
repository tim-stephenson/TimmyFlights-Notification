# TimmyFlights
Notification API for being alerted when a publicly trackable aircraft flies over a user.
Service to check for what Notifications should be sent out, and then send those Notifications out.
Notification Sign-up info from: [TimmyFlights-Backend](https://github.com/tim-stephenson/TimmyFlights-Backend) service


## Dev notes:
### OpenSky Network Account:
A `src/SecurityCredentials.json` file is needed with two fields, username and password, associated with a [OpenSky Network](https://opensky-network.org/) Account. This is how you data on planes is received. This file is added to .gitignore so I do not leak my own account

### Compiling Script
The typescript code compiles into javascript in the `dist/` folder and copies `package.json` and `package-lock.json` there with the `"npm run compile"` script. 

### Deployment
This was made to be deployed to a AWS lambda function, with `index.NotiCheck` as the handler, and Node.js 16.x

### AWS Lambda Configuration
This service connects to a EventBridge (CloudWatch Events) trigger in AWS Lambda to get triggered on a regular interval. Currently that interval is every 2 minutes
    * OpenSky Network, limits each account to 1000 requests per day, so by sending a request every two minutes, it keeps the application to 720 requests per day. In the future it is the goal to get the OpenSky Network account's request limit increased to at least 1440 requests per day in order to make a request every minute

### Geometric Calculations
The package [geolib](https://www.npmjs.com/package/geolib) was considered, but was it was decided not to use it. However it's source code was used as inspiration for some of the util functions, where short distance (flat earth) approximations could be made, allowing for less computationally expensive functions. As geolib took some inspiration from http://www.movable-type.co.uk/scripts/latlong.html, it partially inspired part of the util functions here as well.

Currently this only works to Notify based on a radius around the point, with no input of the speed and direction of the plane. Notifications based on projection of the speed and direction are being worked on.

### Future front-end + auth plans
Currently the GET request this service makes to TimmyFlights-Backend has no authentication attached to it (anyone can make the GET request without restriction). In the future this GET request which return all notification sign-ups would be restricted to just this service.