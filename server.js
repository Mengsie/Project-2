const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
app.use(express.json());
const session = require("express-session");

const bcrypt = require('bcrypt')
const http = require('http')
const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync('private.key');
const certificate = fs.readFileSync('certificate.crt');


const options = {
  key: privateKey,
  cert: certificate
};

const server = https.createServer(options, app);

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { 'Location': `https://${req.headers.host}:3000${req.url}` });
  res.end();
});

const portHTTP = 80

httpServer.listen(portHTTP, () => {
  console.log(`HTTP server listening on port ${portHTTP}`);
});

const portHTTPS = 3000

server.listen(portHTTPS, () => {
  console.log(`HTTPS server listening on port ${portHTTPS}`)
})


app.get('/', function(req, res){
  res.sendFile(__dirname + '/frontend/opret.html');

});


//------------SOCKET IO --------------------------------
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: false
});

app.use(sessionMiddleware);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));


io.use((socket, next) => {
  
  const session = socket.request.session;
  if (session && session.loggedIn) {
    console.log("logget ind!")
    next()
  } else {
    next(new Error('unauthorized'));
  }
});


const users = {}

io.on('connection', (socket) => {

  username = socket.request.session.username

  users[socket.id] = socket.request.session.username


  
  
  socket.broadcast.emit('user-connected', username)

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
  })

  socket.on('disconnect', () =>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })

})

//-----------SERVER REQUEST--------------------------------
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // Handle error
    } else {
      res.redirect('/login.html');
      console.log("logout")
      console.log(req.session)
    }
  });
});



const db = new sqlite3.Database('./db.sqlite');

db.serialize(function() {
    console.log('creating databases if they don\'t exist');
    db.run('create table if not exists users (userid integer primary key, username text, password text)');
});


app.use(express.static(__dirname + "/frontend/"));



app.post("/opret", async (req, res) => {
  try {

    //Info fra request
    const payload = {
      password: req.body.password,
      username: req.body.name,
    };

    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    //indsæt i database
    await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
      [payload.username, hashedPassword]
    );
    res.send({ message: "Bruger lavet" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Fejl i bruger" });
  }
});

///seesssssion----------------
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
      secret: "hemmelig",
      saveUninitialized: false,
      cookie: { maxAge: oneDay },
      resave: false,
  })
);


app.post("/login", async (req, res) => {
  
  const payload = {
    password: req.body.password,
    username: req.body.name,
  };
    
  db.all(`SELECT * FROM users WHERE username='${payload.username}'`, async function(err, table) {
      try {
        if( await bcrypt.compare(payload.password, table[0].password)){
        req.session.loggedIn = true;
        req.session.username = payload.username;
        res.redirect('/chat.html');
        console.log("det stemmer")
             
        } else (
          res.status(404).send('Bruger finde ikke')
          
        )
          
       } catch {
         console.log("rip")
         console.log
         
       }
    
  })

});



/*
db.all(`SELECT * FROM users WHERE username="Kat"`, async function(err, table) {
  console.log(table[0].password)
})
*/


//test
app.get("/login", (req, res) => {
  req.session.loggedIn = true;
  req.session.username = "mikkel"
  res.sendFile(__dirname + '/frontend/chat.html');

});

//test
app.get("/login2", (req, res) => {
  req.session.loggedIn = true;
  req.session.username = "Katrine"
  res.sendFile(__dirname + '/frontend/chat.html');

});