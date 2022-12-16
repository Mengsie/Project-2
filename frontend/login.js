
// Listening on all id in the update.html
// using preventDefault, so the submit dosen't execute when the HTML page opens 
form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    
      const user = {
        name: name,
        password: password,
      };
    
      fetch("https://localhost:3000/login", {
        method: "POST", 
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    
      })
      //Håndterer promise fra fetch med then
      .then((response) => {
      //Hvis oplsyningerne ikke findes sendes en alert
      if (response.status === 404) {
           alert("brugeren findes ikke!");
      }   
    
      else {
          location.href='https://localhost:3000/chat.html'
          
      }})
    
  });







