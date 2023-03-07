const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {

    //Request method : /me
    app.use('/me', meRouter);

    //Request method : /news
    app.use('/news', newsRouter);

    //Request method : /courses
    app.use('/courses', coursesRouter)

    //Request method : /
    app.use('/', siteRouter);
}

module.exports = route;
