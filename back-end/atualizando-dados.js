const empresa = {
    id: 84,
    Nome: 'ZIRAN NORDESTE',
    Atividade: 'Transporte Rodoviário de Cargas e DEPOT',
    Município: 'Ipojuca',
    Polo: 'Logística',
    Endereço: 'Rodovia PE-60, km 10, Ipojuca, PE',
    Contato: '+55 (81) 3079-8966',
    Latitude: '-8.395811617662497',
    Longitude: '-35.02199531305593'
};

const id = empresa.id;

const url = `http://localhost:3000/empresa/${id}`;

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
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })