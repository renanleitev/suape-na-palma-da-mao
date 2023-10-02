const initialUrl = `https://api-suape.onrender.com/ponto/`;

const options =
{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "GET",
};

fetch(initialUrl, options)
    .then((resposta) => resposta.json())
    .then(data => {
        listaPontos = data.sort((a, b) => a.Nome.localeCompare(b.Nome));
        console.log(JSON.stringify(listaPontos));
    });