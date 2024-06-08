const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const projectRoute = require('./projectRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/member',
        route: userRoute
    },
    {
        path: '/project',
        route: projectRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
