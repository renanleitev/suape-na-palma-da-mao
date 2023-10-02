const ponto = 
{
    "id": 5,
    "Nome": "Restaurante & Pizzaria Passira",
    "Atividade": "Restaurante",
    "Endereço": "Rue Cinquenta e Cinco, 25 - Residencial Mini, Cabo de Santo Agostinho, PE",
    "Contato": "+55 81 3518-2020",
    "Latitude": "-8.288627911116588",
    "Longitude": "-35.02873152178284"
};

const id = ponto.id;

const url = `https://api-suape.onrender.com/ponto/${id}`;

fetch(
    url,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(ponto)
    })
    .then(function(){ console.log("atualização bem-sucedida") })
    .catch(function(res){ console.log("deu erro", res) })