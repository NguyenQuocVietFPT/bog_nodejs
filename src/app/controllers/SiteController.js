const Course = require('../models/Course');
class SiteController {
    //[GET] : /
    home(req, res) {
        Course.find({} , function (err, courses) {
            if(!err) {
                res.json(courses);
                return;
            }
            res.status(500).json({ error: 'ERR!!!!' });
        });
    }

    //[GET] : /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
