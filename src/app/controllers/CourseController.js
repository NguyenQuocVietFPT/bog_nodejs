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

    //[GET] : /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] : /courses/store
    store(req, res, next) {
        const formData = req.body;
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[GET] : /courses/edit/:id
    edit(req, res, next) {
        Course
            .findById(req.params.id)
            .then(course => res.render('courses/edit',{
                    course : MongoToObject(course)
                }))
            .catch(next);
        
    }

    //[PUT] : /courses/:id
    update(req, res, next) {        

        var formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.updateOne({_id : req.params.id} , formData)
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next);

    }

    //[DELETE]: /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next)
    }

    //[DELETE]: /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next)
    }

    //[PATCH]: /courses/:id/restore
    restore(req, res, next){
        Course.restore({ _id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next)
    }

    //[POST]: /courses/handle-form
    handleForm(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: {$in : req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({message : 'Action is invalid'});
                break;
        };        
    }

    //[POST]: /courses/trash-form
    trashForm(req, res, next) {        
        switch(req.body.action) {
            case 'restore':
                Course.restore({ _id: {$in : req.body.courseIds}})
                        .then(() => res.redirect('/me/stored/courses'))
                        .catch(next)
                break;                                  
            case 'delete':
                Course.deleteMany({ _id: {$in : req.body.courseIds}})
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next)
                break;
            default:
                res.json({message: "Action is invalid"});
                break;
        }        
    };
}

module.exports = new SiteController();
