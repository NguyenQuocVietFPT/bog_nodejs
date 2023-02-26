const Course = require('../models/Course');

const {multipleMongoToObject} = require('../../util/mongoose');
class MeController {
    
    //[GET] : /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({});

        
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column] : req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, countDelete]) => 
                    res.render('me/stored-course', {
                    countDelete,
                    courses : multipleMongoToObject(courses)
                }))
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then(countDelete => console.log(countDelete))
        //     .catch(next);

        // Course.find({})
        //         .then(courses => res.render('me/stored-course', {
        //             courses : multipleMongoToObject(courses)
        //         }))
        //         .catch(next)        
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
