const db = require('./../../db').AuditoriumTypes;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(auditoriumTypes => response.end(JSON.stringify(auditoriumTypes)))
            .catch(err => {
                response.statusCode = 400;
                response.end(JSON.stringify({error: err.toString()}));
            });
    },
    post: (request, response) => {
        let result='';
        request.on('data', (data) => {
            result += data;
        });
        request.on('end', () => {
        const {auditorium_type, auditorium_typename} = JSON.parse(result);
        db.create({
            auditorium_type: auditorium_type,
            auditorium_typename: auditorium_typename
        }).then(newAuditoriumType => response.end(JSON.stringify(newAuditoriumType)))
            .catch(err => {
                response.statusCode = 400;
                response.end(JSON.stringify({error: err.toString()}));
            });
        });
    },
    put: (request, response) => {
        let result='';
        request.on('data', (data) => {
            result += data;
        });
        request.on('end', () => {
        const {auditorium_type, auditorium_typename} = JSON.parse(result);
        const updatedAuditoriumType = {
            auditorium_type: auditorium_type,
            auditorium_typename: auditorium_typename
        };
        db.update(updatedAuditoriumType, {
            where: { auditorium_type: auditorium_type }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.end(JSON.stringify(updatedAuditoriumType));
            } else {
                response.statusCode = 400;
                response.end(JSON.stringify({error: 'No such records have been found'}));
            }
        }).catch(err => {
            response.statusCode = 400;
            response.end(JSON.stringify({error: err.toString()}));
        });
    });
    },
    delete: (request, response) => {
        const deletedAuditoriumType = { auditorium_type: request.url.split('/')[3] };
        db.destroy({
            where: deletedAuditoriumType
        }).then(isDeleted => {
            if (isDeleted) {
                response.end(JSON.stringify(deletedAuditoriumType));
            } else {
                response.statusCode = 400;
                response.end(JSON.stringify({error: 'No such records have been found'}));
            }
        }).catch(err => {
            response.statusCode = 400;
            response.end(JSON.stringify({error: err.toString()}));
        });
    }
};
