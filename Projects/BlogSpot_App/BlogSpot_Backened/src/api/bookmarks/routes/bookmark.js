'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/bookmarks',
            handler: 'bookmark.find',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/bookmarks/:id',
            handler: 'bookmark.findOne',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/bookmarks',
            handler: 'bookmark.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/bookmarks/:id',
            handler: 'bookmark.update',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'DELETE',
            path: '/bookmarks/:id',
            handler: 'bookmark.delete',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
