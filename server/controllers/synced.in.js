
"use strict"

const responses = require('../models/responses')
const syncedInService = require('../services/synced.in.services')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: _read,
        readById: _readById,
        create: _create
    }
}

function _read(req, res) {
    syncedInService.read()
        .then(syncedIn => {
            res.json(syncedIn)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function _readById(req, res) {
    syncedInService.readById(req.params.id)
        .then(profiles => {
            // const responseModel = new responses.ItemResponse()
            // responseModel.item = profiles
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _create(req, res) {
    req.model.userId = req.auth.userId
    syncedInService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(200)
                .location(`${_apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}