const db = require('./../../db').Faculties;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(faculties =>
                response.end(JSON.stringify({'faculties':faculties}))
                )
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
        const {faculty, faculty_name} = JSON.parse(result);
        db.create({
            faculty: faculty,
            faculty_name: faculty_name
        }).then(newFaculty => response.end(JSON.stringify(newFaculty)))
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
        const {faculty, faculty_name} = JSON.parse(result);
        const updatedFaculty = {faculty: faculty, faculty_name: faculty_name};
        db.update(updatedFaculty, {
            where: { faculty: faculty }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.end(JSON.stringify(updatedFaculty));
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
        const deletedFaculty = { faculty: request.url.split('/')[3] };
        db.destroy({
            where: deletedFaculty
        }).then(isDeleted => {
            if (isDeleted) {
                response.end(JSON.stringify(deletedFaculty));
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
