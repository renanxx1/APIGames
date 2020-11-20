const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id: 1,
            title: 'Call of duty',
            year: 2020,
            price: 100,
        },
        {
            id: 2,
            title: 'Tomb Raider',
            year: 2020,
            price: 30,
        },
        {
            id: 3,
            title: 'PubG',
            year: 2020,
            price: 120,
        }
    ],
    users: [
        {
            id: 1,
            name: "Renan",
            email: "renan@gmail.com",
            pass: "123",
        },
        {
            id: 2,
            name: "Ana",
            email: "ana@gmail.com",
            pass: "321",
        }
    ]
}


app.get('/games', (req, res) => {
    res.statusCode(200);
    res.json(DB.games);
})

app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
})

app.post('/game', (req, res) => {
    var { title, year, price } = req.body;
    if (title == null || isNaN(year) || isNaN(price)) {
        res.sendStatus(400);
    } else {
        DB.games.push({
            id: DB.games.length + 1,
            title,
            year,
            price
        })
    }
})

app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
})


app.put('/game/:id', (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            var { title, year, price } = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
})

app.post('/auth', (req, res) => {
    var { email, pass } = req.body;

    if (email != undefined) {

        var user = DB.users.find(u => u.email == email);

        if (user != undefined) {
            if (user.pass == password) {
                res.status(200);
                res.json({ token: 'TOKEN' });
            }

        } else {
            res.status(400);
            res.json({ message: 'Credenciais Invalidas' })
        }


    } else {
        res.status(400);
        res.json({ message: 'O email é invalido' })
    }
})

app.listen(8081, () => {
    console.log("API RODANDO")
})
