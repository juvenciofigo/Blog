function adminAuth(req, res, next) {
    if (req.session.user != undefined) {
        next();
    } else {
        res.redirect("/login");
    }
}
module.exports = adminAuth;

// Lutar por algiem nao é tentar fazer com a alguem que gosta da outra pessoa goste de Ti. So vais se machucar