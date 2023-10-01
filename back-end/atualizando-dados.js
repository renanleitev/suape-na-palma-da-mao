const empresa = {
    id: 11,
    Nome: "BRASALPLA",
    Atividade: "Fabricação de embalagens plásticas",
    Município: "Cabo de Santo Agostinho",
    Polo: "Preforma PET e Plástico",
    Endereço: "Rodovia PE-60, 3º acesso, nº 5023, Cabo de Santo Agostinho. CEP: 54.510-000",
    Contato: "+55 81 2137-4900",
    Latitude: '-8.337301404644725',
    Longitude: '-35.02893228036875'
};

const id = empresa.id;

const url = `https://api-suape.onrender.com/empresa/${id}`;

fetch(
    url,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(empresa)
    })
    .then(function(){ console.log("atualização bem-sucedida") })
    .catch(function(res){ console.log("deu erro", res) })