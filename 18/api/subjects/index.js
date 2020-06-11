const db = require('./../../db').Pulpits;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(subjects => response.json(subjects))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    post: (request, response) => {
        const {subject, subject_name, pulpit} = request.body;
        db.create({
            subject: subject,
            subject_name: subject_name,
            pulpit: pulpit
        }).then(newSubject => response.json(newSubject))
            .catch(err => {
                response.statusCode = 400;
                response.json({error: err.toString()});
            });
    },
    put: (request, response) => {
        const {subject, subject_name, pulpit} = request.body;
        const updatedSubject = {
            subject: subject,
            subject_name: subject_name,
            pulpit: pulpit
        };
        db.update(updatedSubject, {
            where: { subject: subject }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.json(updatedSubject);
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
        const deletedSubject = { subject: request.params.subject };
        db.destroy({
            where: deletedSubject
        }).then(isDeleted => {
            if (isDeleted) {
                response.json(deletedSubject);
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
