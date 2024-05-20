'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/users',
            handler: 'user.find',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/users/:id',
            handler: 'user.findOne',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/users',
            handler: 'user.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/users/:id',
            handler: 'user.update',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'DELETE',
            path: '/users/:id',
            handler: 'user.delete',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
