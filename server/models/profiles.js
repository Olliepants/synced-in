
"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    name: Joi.string().min(2).max(80).optional(),
    genre: Joi.string().optional().allow(null, '').default(null),
    instrument: Joi.string().max(30).optional(),
    location: Joi.string().max(3).optional(),
    bio: Joi.string().optional().min(2).max(30),
    _id: Joi.objectId()
}

module.exports = Joi.object().keys(schema)
