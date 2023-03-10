
form.addEventListener('submit', async function(e) {
    e.preventDefault()
    
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    
      const payload = {
        name: name,
        password: password,
      };

      try {
      const response = await fetch("/login", {
        method: "POST", 
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    
      })
      //Håndterer promise fra fetch med then
      if (response.status === 401) {
           alert("Log ind fejlet!");
           throw new Error("Fejl");
      }   
    
      else {
        //send chat app html
          location.href='/chat.html'
        }
      } catch (error) {
        console.error(error);
      }
});
    
          




