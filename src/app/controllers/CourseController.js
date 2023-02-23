const Course = require('../models/Course');

const {MongoToObject} = require('../../util/mongoose');
class SiteController {

    //[GET] : /courses/:slug
    show(req, res, next) {

        Course.findOne({
            slug : req.params.slug
        })
        .then(course => res.render('courses/show' , {
            course : MongoToObject(course)
        }))
        .catch(next)
        
    }
}

module.exports = new SiteController();
