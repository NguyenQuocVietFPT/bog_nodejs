const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

//[GET] /courses/create
router.get('/create', courseController.create);

//[POST] /courses/store
router.post('/store', courseController.store);

//[GET] /courses/edit/:id
router.get('/edit/:id', courseController.edit);

//[POST] /courses/handle-form
router.post('/handle-form', courseController.handleForm);

//[POST] /courses/trash-form
router.post('/trash-form', courseController.trashForm);

//[PUT] /courses/:id
router.put('/:id', courseController.update);

//[PATCH] /courses/:id/restore
router.patch('/:id/restore', courseController.restore);

//[DELETE] /courses/:id
router.delete('/:id', courseController.destroy);

//[DELETE] /courses/:id/force
router.delete('/:id/force', courseController.forceDestroy);

//[GET] /courses/:slug
router.get('/:slug', courseController.show);

module.exports = router;
