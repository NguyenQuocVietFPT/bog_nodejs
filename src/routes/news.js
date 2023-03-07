const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

//[GET] /news/create
router.get('/create', newsController.create);

//[GET] /news/:slug
router.get('/:slug', newsController.show);

//[GET] /
router.get('/', newsController.index);

module.exports = router;
