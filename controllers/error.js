const get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views','404.')); //when html file is used
    res.status(404).render('404', {
        pageTitle: '404 Error',
        currentPage: '404',
        isLoggedIn:req.isLoggedIn,
        user:req.session.user, 
    }); // wehn ejs file is used
}

exports.get404 = get404;