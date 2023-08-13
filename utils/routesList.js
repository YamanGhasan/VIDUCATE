/**
 * Routes is array of routes (objects) to be loaded,
 * Each object cotains the following attributes
 * - path: route file name
 * - prefix: prefix of inner routes in file, default is "/"
 * - available: boolean to determine route status in production mode
 * - middleware: string | list of strigs determines middlewares names
 *
 *
 */
const Routes = [
  { path: "homeRoutes", prefix: "/", available: true, middleware: null },
  { path: "videoRoutes", prefix: "/", available: true, middleware: null },
  { path: "categoryRoutes", prefix: "/", available: true, middleware: null },
  { path: "authRoutes", prefix: "/", available: true, middleware: null },
  { path: "liveChatRoutes", prefix: "/", available: true, middleware: null },
  { path: "commentRoutes", prefix: "/", available: true, middleware: null },
  { path: "clapRoutes", prefix: "/", available: true, middleware: null },
  { path: "tagRoutes", prefix: "/", available: false, middleware: null },
  { path: "elasticRoutes", prefix: "/", available: false, middleware: null },
  { path: "reqVideoRoutes", prefix: "/", available: false, middleware: null },
  { path: "apiRoutes", prefix: "/api", available: false, middleware: null },
  { path: "notesRoute", prefix: "/", available: false, middleware: null },
  { path: "subRoutes.js", prefix: "/", available: false, middleware: null },
  { path: 'jwtRoutes', prefix: '/api', available: false, middleware: null },


  // Add your new routes here

  // Add your new routes here

  // Note: failureRoutes always will be at end of this list
  { path: "failureRoutes", prefix: "/", available: true, middleware: null },
];

module.exports = {
  Routes,
};
