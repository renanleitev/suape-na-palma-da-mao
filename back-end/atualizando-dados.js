const empresa = {
    id: 7,
    Nome: "ARCLIMA ENGENHARIA LTDA",
    Atividade: "Fabricação de dutos, instalação e manutenção de sistemas centrais de ar condicionado, ventilação e refrigeração",
    Município: "Cabo de Santo Agostinho",
    Polo: "Metalmecânico",
    Endereço: "Estrada TDR Norte, nº 835, Zona Industrial 3, CEP 54590-000, Cabo de Santo Agostinho, PE",
    Contato: "+55 81 3469-8035",
    Latitude: '-8.336229434242698',
    Longitude: '-34.99186056555132'
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