"use strict"



const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    // readByUserId: readByUserId,
    create: _create,
    // readById: readById,
    // update: _update,
    // delete: _delete
}


function _read() {
    return conn.db().collection('profiles').find({}).toArray()
        .then(apples => {
            for (let i = 0; i < apples.length; i++) {
                let apple = apples[i]
                apple._id = apple._id.toString()
                //  profile.userId = profile.userId.toString()
                //console.log(apples)
            }
            return apples
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readByUserId(userId) {
    return conn.db().collection('profiles').find({ dateDeactivated: null, userId: new ObjectId(userId) }).toArray()
        .then(bananas => {
            for (let i = 0; i < bananas.length; i++) {
                let banana = bananas[i]
                banana._id = banana._id.toString()
                banana.userId = banana.userId.toString()
            }
            return bananas
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(model) {
    const safeDoc = {
        dateCreated: new Date(),
        dateModified: new Date(),
        name: model.name,
        genre: model.genre,
        instrument: model.instrument,
        location: model.location,
        bio: model.bio,
        userId: new ObjectId(model.userId)
    }

    return conn.db().collection('profiles').insertOne(safeDoc)
        .then(result => result.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}


// function readById(id) {
//     return conn.db().collection('addresses').findOne({ _id: new ObjectId(id) })
//         .then(addresses => {
//             addresses._id = addresses._id.toString()
//             addresses.userId = addresses.userId.toString()
//             return addresses
//         })
//         .catch(err => {
//             console.warn(err)
//             return Promise.reject(err)
//         })
// }

//     return conn.db().collection('addresses').insertOne(safeDoc)
//         .then(result => result.insertedId.toString())
//         .catch(err => {
//             console.warn(err)
//             return Promise.reject(err)
//         })
// }

// function _update(id, model) {
//     const safeDoc = {

//         $set: {
//             _id: new ObjectId(model._id),
//             dateModified: new Date(),
//             lineOne: model.lineOne,
//             lineTwo: model.lineTwo,
//             city: model.city,
//             stateCode: model.stateCode,
//             postalCode: model.postalCode,
//             lat: model.lat,
//             lon: model.lon,
//         }
//     }

//     return conn.db().collection('addresses').updateOne({ _id: new ObjectId(id) }, safeDoc)
//         .then(result => result.matchedCount)
//         .catch(err => {
//             console.warn(err)
//             return Promise.reject(err)
//         })
// }

// function _delete(id, model) {
//     const safeDoc = {
//         $set:
//             {
//                 dateDeactivated: new Date(),
//                 dateModified: new Date()
//             }
//     }
//     return conn.db().collection('addresses').updateOne({ _id: new ObjectId(id) }, safeDoc)
//         .then(result => { result.matchedCount })

//         .catch(err => {
//             console.warn(err)
//             return Promise.reject(err)
//         })
// }




