const empresa = {
    id: 31,
    Nome: 'FLEX EMBALAGENS PLÁSTICAS',
    Atividade: 'Embalagens Plásticas',
    Município: 'Cabo de Santo Agostinho',
    Polo: 'Preforma PET e Plástico',
    Endereço: 'Rodovia PE-60, nº 6202, Cabo de Santo Agostinho, PE',
    Contato: '+55 81 3064-089',
    Latitude: '-8.32733785287399',
    Longitude: '-35.00830555338384'
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