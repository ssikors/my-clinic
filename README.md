# Running the app

* Ensure you are using .NET 8

### Development:
* Open the ApiClinic in Visual Studio 2022
* Run migrations, Update the Database
* Run the app
* Open clinic-web in Visual Studio Code
* Run `npm install`
* Run the app with `npm run dev`

### Serve static files from the Web Api
* Ensure useStaticFiles is in Program.cs
* Use export option in next.config.js of the web api
* Export static files with `npm run build`
* Copy all these files into /wwwroot in ApiClinic