const db = require('./../../db').Pulpits;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(pulpits => response.json(pulpits))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    post: (request, response) => {
        const {pulpit, pulpit_name, faculty_name} = request.body;
        db.create({
            pulpit: pulpit,
            pulpit_name: pulpit_name,
            faculty_name: faculty_name
        }).then(newPulpit => response.json(newPulpit))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    put: (request, response) => {
        const {pulpit, pulpit_name, faculty_name} = request.body;
        const updatedPulpit = {
            pulpit: pulpit,
            pulpit_name: pulpit_name,
            faculty_name: faculty_name
        };
        db.update(updatedPulpit, {
            where: { pulpit: pulpit }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.json(updatedPulpit);
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
        const deletedPulpit = { auditorium_type: request.params.pulpit };
        db.destroy({
            where: deletedPulpit
        }).then(isDeleted => {
            if (isDeleted) {
                response.json(deletedPulpit);
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
