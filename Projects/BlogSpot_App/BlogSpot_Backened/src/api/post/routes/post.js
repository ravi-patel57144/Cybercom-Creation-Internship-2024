'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/posts',
            handler: 'post.find',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/posts/:id',
            handler: 'post.findOne',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/posts',
            handler: 'post.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/posts/:id',
            handler: 'post.update',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'DELETE',
            path: '/posts/:id',
            handler: 'post.delete',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
