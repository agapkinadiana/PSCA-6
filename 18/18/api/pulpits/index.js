const db = require('./../../db').Pulpits;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(pulpits => response.end(JSON.stringify(pulpits)))
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
        const {pulpit, pulpit_name, faculty_name} = JSON.parse(result);
        db.create({
            pulpit: pulpit,
            pulpit_name: pulpit_name,
            faculty_name: faculty_name
        }).then(newPulpit => response.end(JSON.stringify(newPulpit)))
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
        const {pulpit, pulpit_name, faculty_name} = JSON.parse(result);
        const updatedPulpit = {
            pulpit: pulpit,
            pulpit_name: pulpit_name,
            faculty_name: faculty_name
        };
        db.update(updatedPulpit, {
            where: { pulpit: pulpit }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.end(JSON.stringify(updatedPulpit));
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
        const deletedPulpit = { auditorium_type: request.url.split('/')[3] };
        db.destroy({
            where: deletedPulpit
        }).then(isDeleted => {
            if (isDeleted) {
                response.end(JSON.stringify(deletedPulpit));
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
