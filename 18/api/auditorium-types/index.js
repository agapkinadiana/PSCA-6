const db = require('./../../db').AuditoriumTypes;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(auditoriumTypes => response.json(auditoriumTypes))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    post: (request, response) => {
        const {auditorium_type, auditorium_typename} = request.body;
        db.create({
            auditorium_type: auditorium_type,
            auditorium_typename: auditorium_typename
        }).then(newAuditoriumType => response.json(newAuditoriumType))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    put: (request, response) => {
        const {auditorium_type, auditorium_typename} = request.body;
        const updatedAuditoriumType = {
            auditorium_type: auditorium_type,
            auditorium_typename: auditorium_typename
        };
        db.update(updatedAuditoriumType, {
            where: { auditorium_type: auditorium_type }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.json(updatedAuditoriumType);
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
        const deletedAuditoriumType = { auditorium_type: request.params.auditoriumType };
        db.destroy({
            where: deletedAuditoriumType
        }).then(isDeleted => {
            if (isDeleted) {
                response.json(deletedAuditoriumType);
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
