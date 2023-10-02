const id = 3;

const initialUrl = `https://api-suape.onrender.com/ponto/${id}`;

const options =
{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "DELETE",
};

fetch(initialUrl, options)
    .then(function(){ console.log("deletou bem-sucedida") })
    .catch(function(res){ console.log("deu erro", res) })