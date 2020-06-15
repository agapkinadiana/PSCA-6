const db = require('./../../db').Pulpits;

module.exports = {
    get: (request, response) => {
        db.findAll()
            .then(subjects => response.end(end.stringify(subjects)))
            .catch(err => {
                response.statusCode = 400;
                response.end(end.stringify({error: err.toString()}));
            });
    },
    post: (request, response) => {
        let result='';
        request.on('data', (data) => {
            result += data;
        });
        request.on('end', () => {
        const {subject, subject_name, pulpit} = JSON.parse(result);
        db.create({
            subject: subject,
            subject_name: subject_name,
            pulpit: pulpit
        }).then(newSubject => response.end(JSON.stringify(newSubject)))
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
        const {subject, subject_name, pulpit} = JSON.parse(result);
        const updatedSubject = {
            subject: subject,
            subject_name: subject_name,
            pulpit: pulpit
        };
        db.update(updatedSubject, {
            where: { subject: subject }
        }).then(isUpdatedArray => {
            if (isUpdatedArray[0]) {
                response.end(JSON.stringify(updatedSubject));
            } else {
                response.statusCode = 400;
                response.end(JSON.stringify({error: 'No such records have been found'}));
            }
        }).catch(err => {
            response.statusCode = 400;
            response.end({error: err.toString()});
        });
    });
    },
    delete: (request, response) => {
        const deletedSubject = { subject: request.url.split('/')[3] };
        db.destroy({
            where: deletedSubject
        }).then(isDeleted => {
            if (isDeleted) {
                response.end(JSON.stringify(deletedSubject));
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
