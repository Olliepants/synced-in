"use strict"

const router = require('express').Router()
const syncedInControllerFactory = require('../controllers/synced.in')
const syncedInApiPrefix = '/api/profiles'
const validateBody = require('../filters/validate.body')
const profiles = require('../models/profiles')
const idFilterJs = require("../filters/id.filter")

module.exports = apiPrefix => {
    const syncedInController = syncedInControllerFactory(apiPrefix)

    // api routes ===========================================================
    router.get('/', syncedInController.read)
    router.get('/:id([0-9a-fA-F]{24})', syncedInController.readById)
    // router.get('/mine', syncedInController.readMine)
    router.post('/', validateBody(profiles), idFilterJs.bodyIdDisallowed, syncedInController.create)
    // router.put('/:id([0-9a-fA-F]{24})', validateBody(address), idFilterJs.bodyIdRequired, idFilterJs.putIdsIdentical, syncedInController.update)
    // router.delete('/:id([0-9a-fA-F]{24})', syncedInController.delete)
    return router
}