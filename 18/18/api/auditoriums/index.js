const db = require('./../../db').Auditoriums;
const url = require('url');

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(auditoriums => response.end(JSON.stringify(auditoriums)))
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
            const {auditorium, auditorium_name, auditorium_capacity, auditorium_typename} = JSON.parse(result);
            db.create({
                auditorium: auditorium,
                auditorium_name: auditorium_name,
                auditorium_capacity: auditorium_capacity,
                auditorium_typename: auditorium_typename
            }).then(newAuditorium => response.end(JSON.stringify(newAuditorium)))
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
        const {auditorium, auditorium_name, auditorium_capacity, auditorium_typename} = JSON.parse(result);
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
                response.end(JSON.stringify(updatedAuditorium));
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
        const deletedAuditorium = { auditorium: url.parse(request.url).pathname.split('/')[3] };
        db.destroy({
            where: deletedAuditorium
        }).then(isDeleted => {
            if (isDeleted) {
                response.end(JSON.stringify(deletedAuditorium));
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
