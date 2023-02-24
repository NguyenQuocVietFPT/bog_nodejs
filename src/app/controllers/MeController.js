const Course = require('../models/Course');

const {multipleMongoToObject} = require('../../util/mongoose');
class MeController {
    
    //[GET] : /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
                .then(courses => res.render('me/stored-course', {
                    courses : multipleMongoToObject(courses)
                }))
                .catch(next)        
    }

    //[GET] : /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
                .then(courses => res.render('me/trash-course', {
                    courses : multipleMongoToObject(courses)
                }))
                .catch(next)        
    }
}

module.exports = new MeController();
