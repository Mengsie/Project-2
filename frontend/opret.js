// get the form from update.html page by id 
var form = document.getElementById("form")

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

      console.log(user)
    
      fetch("https://localhost:3000/opret", {
        method: "POST", 
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
      });
      location.href='https://localhost:3000/login.html'
    
  });