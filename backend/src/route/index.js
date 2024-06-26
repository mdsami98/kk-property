const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const projectRoute = require('./projectRoute');
const inventoryRoute = require('./inventoryRoute');
const expenseRoute = require('./expenseRoute');

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
    },
    {
        path: '/inventory',
        route: inventoryRoute
    },
    {
        path: '/expense',
        route: expenseRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
