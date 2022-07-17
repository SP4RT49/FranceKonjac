var express = require('express');

var app = express();
const port = 8080;

app.use(express.static('public'));
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);


let isAdmin = false;
let loginError = false;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// intégration d'une feuille de style
app.use(express.static(__dirname + '/public'));
app.use("css", express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});


app.get('/', function (req, res) {

        res.render('./home/home.ejs', {
            isAdmin,
            loginError

        });

    })
    // TOUT LES PRODUITS
    .get('/allproducts', function (req, res) {

        res.render('pages/allproducts.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE PRODUIT
    .get('/product', function (req, res) {

        res.render('pages/product.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE RECETTE
    .get('/recette', function (req, res) {

        res.render('pages/recette.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE INFO RECETTE
    .get('/recette/info', function (req, res) {

        res.render('pages/recetteInfo.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE HISTOIRE
    .get('/histoire', function (req, res) {

        res.render('pages/histoire.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE OU ACHETER
    .get('/ouAcheter', function (req, res) {

        res.render('pages/ouAcheter.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE CONTACT
    .get('/contacter', function (req, res) {

        res.render('pages/contact.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE BLOG
    .get('/blog', function (req, res) {

        res.render('pages/blog.ejs', {
            isAdmin,
            loginError
        })
    })
    // PAGE BLOG
    .get('/faq', function (req, res) {

        res.render('pages/faq.ejs', {
            isAdmin,
            loginError
        })
    })
    // LOGIN
    .get('/login', function (req, res) {

        res.render('login/login.ejs', {
            isAdmin,
            loginError
        })
    })
    // TELECHARGEMENT
    .get('/download', function (req, res) {
        const file = `./assets/download/text.txt`;
        const name = `text.txt`;
        res.download(file, name);
    })
    // TCHAT
    .get('/tchat', function (req, res) {
        res.render('tchat/tchat.ejs', {
            isAdmin,
            loginError
        });
    })
    // FORMULAIRE DE CONNEXION
    .post('/login', function (req, res) {
        console.log(req.body)
        loginError = false
        if (req.body.username === "admin" && req.body.password === "admin") {
            res.setHeader('Set-Cookie', 'isAdmin=' + true);
            isAdmin = true;
            res.redirect('/')
        } else {
            loginError = true
            res.redirect('/login')
        }
    })
    .get('/logout', function (req, res) {
        isAdmin = false;
        res.setHeader('Set-Cookie', 'isAdmin=' + isAdmin);
        res.redirect('/')
    })



//Error 404
app.use(function (req, res, next) {
    res.status(404).render('404/404.ejs', {isAdmin,loginError});
});

console.log('[' + port + ']Serveur démarré ! http://localhost:'+ port +'');
server.listen(port);