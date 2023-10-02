// const empresa = {
//     id: 84,
//     Nome: 'ZIRAN NORDESTE',
//     Atividade: 'Transporte Rodoviário de Cargas e DEPOT',
//     Município: 'Ipojuca',
//     Polo: 'Logística',
//     Endereço: 'Rodovia PE-60, km 10, Ipojuca, PE',
//     Contato: '+55 (81) 3079-8966',
//     Latitude: '-8.396078643478678',
//     Longitude: '-35.02193239645103'
// };

// const id = empresa.id;

// const url = `https://api-suape.onrender.com/empresa/${id}`;

// fetch(
//     url,
//     {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         method: "PATCH",
//         body: JSON.stringify(empresa)
//     })
//     .then(function(){ console.log("atualização bem-sucedida") })
//     .catch(function(res){ console.log("deu erro", res) })