/*
onst brugere = []

async function lol(ord){
  try { const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(ord, salt)
  console.log(salt)
  console.log(hashedPassword)
  const bruger = {name: "hej", password: hashedPassword}
  brugere.push(bruger)
  
  } catch {
    console.log("hej")
  }
    console.log(brugere[0].password)
    login(brugere[0].password)

}

async function login(ord){
  const user = {name: "fuck", password: "password"}
  console.log(ord)
  try {
   if( await bcrypt.compare("password", ord)){
    console.log("det stemmer")
   } else (
    console.log("fejl")
   )

  } catch {
    console.log("rip")
  }

}


lol("password")





db.all(`SELECT * FROM users WHERE username='${payload.username}'`, async function(err, table) {
    if(!table['0']){
      console.log("false")
      res.status(404).send('Bruger finde ikke');
    } else {
      try {
        if( await bcrypt.compare(payload.password, table[0].password)){
         console.log("det stemmer")
         res.send("log ind nu")
         
        } else (
          res.status(404).send('Bruger finde ikke')
        )
      
       } catch {
         console.log("rip")
         
       }
    }
  })




req.session.loggedIn = true;
  req.session.username = payload.username;;
  console.log(req.session);


if (req.session.loggedIn) {
    return res.sendFile(__dirname + '/frontend/chat.html');
  } else {
      return res.redirect("/");
  }


*/