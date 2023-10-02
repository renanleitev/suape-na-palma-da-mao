const ponto = 
{
    "id": 3,
    "Nome": "Mandaca Bistrô Regional",
    "Atividade": "Restaurante",
    "Endereço": "Av. Alm. Paulo Moreira, 584 - Garapu, Cabo de Santo Agostinho, PE",
    "Contato": "+55 81 98318-6802",
    "Latitude": "-8.282813226021217",
    "Longitude": "-35.020049503842934"
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