const empresa = {
    id: 4,
    Nome: "AMCOR DO NORDESTE INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA",
    Atividade: "Fabricação de embalagens em material plástico",
    Município: "Cabo de Santo Agostinho",
    Polo: "Preforma PET e Plástico",
    Endereço: "Rodovia PE-60, s/n, 54520-600  Cabo de Santo Agostinho, PE",
    Contato: "+55 81 3201-9510",
    Latitude: '-8.332482145893096',
    Longitude: '-34.99222408100839'
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