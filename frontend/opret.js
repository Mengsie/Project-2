// form fra HTML
var form = document.getElementById("form")


form.addEventListener('submit', async function(e) {

    e.preventDefault()
    
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    
      const payload = {
        name: name,
        password: password,
      };

      try {
        // Post request til server
        const response = await fetch("/opret", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // response håndtering
        if (response.status === 200) {
          location.href = "/login.html";
        } else {
          throw new Error("Fejl");
        }
      } catch (error) {
        console.error(error);
      }
});