const db = require('./../../db').Auditoriums;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(auditoriums => response.json(auditoriums))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    post: (request, response) => {
        const {auditorium, auditorium_name, auditorium_capacity, auditorium_typename} = request.body;
        db.create({
            auditorium: auditorium,
            auditorium_name: auditorium_name,
            auditorium_capacity: auditorium_capacity,
            auditorium_typename: auditorium_typename
        }).then(newAuditorium => response.json(newAuditorium))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    put: (request, response) => {
        const {auditorium, auditorium_name, auditorium_capacity, auditorium_typename} = request.body;
        const updatedAuditorium = {
            auditorium: auditorium,
            auditorium_name: auditorium_name,
            auditorium_capacity: auditorium_capacity,
            auditorium_typename: auditorium_typename
        };
        db.update(updatedAuditorium, {
            where: { auditorium: auditorium }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.json(updatedAuditorium);
            } else {
                response.statusCode = 400;
                response.json({error: 'No such records have been found'});
            }
        }).catch(err => {
            response.statusCode = 400;
            response.json({error: err.toString()});
        });
    },
    delete: (request, response) => {
        const deletedAuditorium = { auditorium: request.params.auditorium };
        db.destroy({
            where: deletedAuditorium
        }).then(isDeleted => {
            if (isDeleted) {
                response.json(deletedAuditorium);
            } else {
                response.statusCode = 400;
                response.json({error: 'No such records have been found'});
            }
        }).catch(err => {
            response.statusCode = 400;
            response.json({error: err.toString()});
        });
    }
};
