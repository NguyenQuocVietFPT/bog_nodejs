const Course = require('../models/Course');

const {multipleMongoToObject} = require('../../util/mongoose');
class SiteController {
    //[GET] : /
    home(req, res, next) {
        Course.find({})
                .then(courses => {
                    res.render('home', {
                        courses : multipleMongoToObject(courses)
                    })
                })
                .catch(next);   
    }

    //[GET] : /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
