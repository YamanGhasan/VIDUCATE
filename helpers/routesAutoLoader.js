const { Routes } = require('../utils/routesList');
require("dotenv").config();


module.exports = (app) => {
  if(process.env.APP_MODE === "PRODUCTION") {
    Routes = Routes.filter(route => route.available);
  }

  Routes.forEach(route => {
    let requiredRoute = require(`../routes/${route.path}`);
    app.use(route.prefix, requiredRoute)
  });
}
