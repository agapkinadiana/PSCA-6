const db = require('./../../db').Faculties;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(faculties => response.json(faculties))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    post: (request, response) => {
        const {faculty, faculty_name} = request.body;
        db.create({
            faculty: faculty,
            faculty_name: faculty_name
        }).then(newFaculty => response.json(newFaculty))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    put: (request, response) => {
        const {faculty, faculty_name} = request.body;
        const updatedFaculty = {faculty: faculty, faculty_name: faculty_name};
        db.update(updatedFaculty, {
            where: { faculty: faculty }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.json(updatedFaculty);
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
        const deletedFaculty = { faculty: request.params.faculty };
        db.destroy({
            where: deletedFaculty
        }).then(isDeleted => {
            if (isDeleted) {
                response.json(deletedFaculty);
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
