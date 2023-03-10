const Course = require('../models/Course');

const {multipleMongoToObject} = require('../../util/mongoose');
class MeController {
    
    //[GET] : /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all(
            [Course.find({}).sortable(req), 
            Course.countDocumentsDeleted()])
            .then(([courses, countDelete]) => 
                    res.render('me/stored-course', {
                    countDelete,
                    courses : multipleMongoToObject(courses)
                }))
            .catch(next);
    
    };

    //[GET] : /me/trash/courses
    trashCourses(req, res, next) {

        Course.findDeleted({}).sortable(req)
            .then(courses => res.render('me/trash-course', {
                    courses : multipleMongoToObject(courses)
                }))
                .catch(next)        
    };
}

module.exports = new MeController();
