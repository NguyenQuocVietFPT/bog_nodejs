class NewsController {
    //[GET] : /news
    index(req, res) {
        res.render('news');
    }

    //[GET] : /news/:slug
    show(req, res) {
        res.send('NEW DETAIL !!!');
    }

    //[GET] : /news/create
    create(req, res) {
        res.send('CREATE NEW !!!');
    }
}

module.exports = new NewsController();
