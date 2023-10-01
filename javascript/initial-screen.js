// definindo as coordenadas iniciais
let latitude = -8.394097983524112;
let longitude = -34.97408204488957;
// obtendo o iframe do mapa
const iframe = document.getElementById("google-maps");
// obtendo os containers de mensagem
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const warning = document.getElementById("warning");
const apagarItinerario = document.getElementById("apagar-itinerario");
const offline = document.getElementById("offline");
const errorItinerario = document.getElementById("error-itinerario");
const errorNaoItinerario = document.getElementById("error-nao-itinerario");
// mensagem padrão do itinerario
const defaultItineario = document.getElementById("default-itinerario");
// botão de mostrar informações da empresa
const btnEmpresa = document.getElementById("btn-empresa");
// obtendo as informações das empresas
const empresaNome = document.getElementById('empresa-nome');
const empresaAtividade = document.getElementById('empresa-atividade');
const empresaEndereco = document.getElementById('empresa-endereco');
const empresaContato = document.getElementById('empresa-contato');
// delay para exibir os avisos na tela
const delayTime = 2000;
// armazenando as empresas obtidas com a api
let listaEmpresas = [];
// armazenando as empresas adicionadas ao itinerário
let listaEmpresasItinerario = [];
// armazenando as coordenadas das empresas
let listaEmpresasCoordenadas = [];
// index da empresa (para mostrar informações)
let empresaIndex = 0;
// definindo a url base
// se estiver usando localmente (comentar/descomentar a linha abaixo)
// const baseUrl = "http://localhost:3000";
// se a api estiver rodando no servidor (comentar/descomentar a linha abaixo)
const baseUrl = "https://api-suape.onrender.com";
// localização padrão (porto de suape)
iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
// obtendo a localização do usuário
function getPositionSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
}
// se não for possível obter a localização
function getPositionError() {
    warning.showModal();
    setTimeout(() => warning.close(), delayTime);
    iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
}
navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);
// obtendo os dados das empresas
const initialUrl = `${baseUrl}/empresa/`;
// parametros para a requisição GET
const options =
{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "GET",
};
// fazendo a requisição GET
fetch(initialUrl, options)
    .then((resposta) => resposta.json())
    .then(data => {
        // checando se há ou não empresas no itinerario
        checkItinerario();
        // ordenando os dados em ordem alfabetica e salvando em um array
        // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
        listaEmpresas = data.sort((a, b) => a.Nome.localeCompare(b.Nome))
        // adicionando as empresas na lista de opções
        listaEmpresas.forEach(empresa => {
            // criando um elemento do tipo option
            const option = document.createElement("option");
            // o texto de cada option será o nome da empresa
            option.text = empresa.Nome;
            // o valor de cada option será a latitude e a longitude
            option.value = `${empresa.Latitude},${empresa.Longitude}`;
            // selecionado o elemento select
            const select = document.getElementById("empresas");
            // adicionando cada option no select
            select.appendChild(option);
        });
    });
// checando se há empresas no itinerario
function checkItinerario() {
    // selecionando o botão de pesquisar
    const pesquisarButton = document.getElementById("pesquisar-button");
    // se não houver nenhuma empresa no itinerario
    if (listaEmpresasItinerario.length === 0) {
        // desabilitar o botão de pesquisa
        pesquisarButton.disabled = true;
        // a cor de fundo do botão fica cinza
        pesquisarButton.style.backgroundColor = "gray";
    } else if (listaEmpresasItinerario.length > 0) {
        // se houver empresa no itinerario, a pesquisa fica habilitada
        pesquisarButton.disabled = false;
        // a cor de fundo do botão fica branca
        pesquisarButton.style.backgroundColor = "white";
    }
    // selecionando o contador de empresas no itinerario
    const itinerarioCount = document.getElementById("itinerario-count");
    // o contador será a quantidade de empresas no itinerario
    itinerarioCount.innerHTML = listaEmpresasItinerario.length;
}
// adicionando empresa ao itinerario
function addToListJourney(empresa) {
    // removendo a mensagem de nenhum itinerario
    defaultItineario.innerHTML = "";
    // adicionando a empresa na lista de itinerario
    const itinerarioLista = document.getElementById("itinerario-lista");
    // criando um elemento li (item) para adicionar a lista de itinerario
    const itinerarioItem = document.createElement("li");
    // o texto de cada item da lista será o nome da empresa
    itinerarioItem.innerHTML = empresa.Nome;
    // o id de cada item da lista será o nome da empresa
    itinerarioItem.id = empresa.Nome;
    // definindo as cores para o texto
    itinerarioItem.style.color = "black";
    // adicionando a empresa a lista de itinerario
    itinerarioLista.appendChild(itinerarioItem);
}
// removendo empresa do itinerario
function removeCompanyFromJourney(empresa) {
    try {
        // se o itinerario estiver vazio, exibir mensagem
        if (listaEmpresasItinerario.length === 0) {
            defaultItineario.innerHTML = "Nenhum itinerário disponível.";
        }
        // removendo a empresa da lista de itinerario
        document.getElementById(empresa.Nome).remove();
        // removendo a empresa da lista de coordenadas
        listaEmpresasCoordenadas = listaEmpresasCoordenadas.filter(coordenadas => coordenadas.lat !== empresa.Latitude);
    } catch(e) {
        // se a empresa não estiver no itinerario, exibir mensagem de erro
        errorNaoItinerario.showModal();
        setTimeout(() => errorNaoItinerario.close(), delayTime);
    }
}
// salvando os dados das empresas em um array
function addCompanyToJourney(empresa) {
    listaEmpresasItinerario.push(empresa);
    addToListJourney(empresa);
    const coordenadas = {
        lat: empresa.Latitude,
        lon: empresa.Longitude,
    };
    listaEmpresasCoordenadas.push(coordenadas);
}
// adicionando empresas ao itinerário
function addCompany() {
    // obtendo os valores do input de pesquisar
    const pesquisar = document.getElementById('pesquisar');
    const consulta = pesquisar.value;
    // se o input não estiver vazio
    if (consulta !== ''){
        // procurando a empresa
        const regex = new RegExp(consulta, 'gi');
        const empresaEstaItinerario = listaEmpresasItinerario.find(empresa => empresa.Nome.match(regex));
        if (empresaEstaItinerario) {
            // se a empresa já estiver no itinerario, não pode ser adicionada
            errorItinerario.showModal();
        } else {
            const empresaEncontrada = listaEmpresas.find(empresa => empresa.Nome.match(regex));
            // se a empresa for encontrada
            if (empresaEncontrada) {
                addCompanyToJourney(empresaEncontrada);
                checkItinerario();
            } else {
                // se a empresa não for encontrada
                error.showModal();
            }
        }
    } else {
        // se o input estiver vazio, obter os valores pelo select
        const coordenadasEmpresa = document.getElementById("empresas").value;
        const [empresaLatitude, empresaLongitude] = coordenadasEmpresa.split(',');
        const empresaEncontrada = listaEmpresas.find((empresa) => empresa.Latitude === empresaLatitude);
        const regex = new RegExp(empresaEncontrada.Nome, 'gi');
        const empresaEstaItinerario = listaEmpresasItinerario.find(empresa => empresa.Nome.match(regex));
        if (empresaEstaItinerario) {
            // se a empresa já estiver no itinerario, não pode ser adicionada
            errorItinerario.showModal();
        } else {
            addCompanyToJourney(empresaEncontrada);
            checkItinerario();
        }
    }
}
// removendo empresas do itinerario
function removeCompany() {
    // obtendo os valores do input de pesquisar
    const pesquisar = document.getElementById('pesquisar');
    const consulta = pesquisar.value;
    // se o input não estiver vazio
    if (consulta !== ''){
        // procurando a empresa
        const regex = new RegExp(consulta, 'gi');
        const empresa = listaEmpresasItinerario.find(empresa => empresa.Nome.match(regex));
        // se a empresa for encontrada, remover ela
        if (empresa) {
            // removendo a empresa do itinerario
            listaEmpresasItinerario = listaEmpresasItinerario.filter(empresa => !empresa.Nome.match(regex));
            removeCompanyFromJourney(empresa);
            checkItinerario();
        } else {
            // se a empresa não for encontrada
            error.showModal();
        }
    } else {
        // se o input estiver vazio, obter os valores pelo select
        const coordenadasEmpresa = document.getElementById("empresas").value;
        // separando os valores obtidos pelo valor do select
        const [empresaLatitude, empresaLongitude] = coordenadasEmpresa.split(',');
        // encontrando a empresa, pela latitude
        const empresaEncontrada = listaEmpresasItinerario.find((empresa) => empresa.Latitude === empresaLatitude);
        // se a empresa for encontrada, remover ela
        if (empresaEncontrada) {
            // removendo a empresa do itinerario
            const regex = new RegExp(empresaEncontrada.Nome, 'gi');
            listaEmpresasItinerario = listaEmpresasItinerario.filter(empresa => !empresa.Nome.match(regex));
            removeCompanyFromJourney(empresaEncontrada);
            checkItinerario();
        } else {
            // se a empresa não estiver no itinerario
            errorNaoItinerario.showModal();
        }
    }
}
// obtendo a url para o iframe
// https://medium.com/@supun1001/how-to-generate-google-embed-links-programmatically-for-iframes-for-routes-only-d6dc225e59e8
function createUrlMap(coordenadas) {
    const origem = {
        lat: latitude,
        lon: longitude
    };
    const coords = [origem, ...coordenadas];
    let coordinateString = '';
    // fazendo o cálculo da rota
    for (const item of coords) {
        coordinateString += '!4m3!3m2!1d' + item.lat + '!2d' + item.lon;
    }
    const epochNow = Date.now();
    let urlConstruct = `https://www.google.com/maps/embed?pb=!1m${coords.length * 4 + 16}`;
    urlConstruct += `!1m12!1m3!1d1.0!2d${coords[0].lon}!3d${coords[0].lon}`;
    urlConstruct += `!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;
    urlConstruct += `!4m${coords.length * 4 + 1}!3e0${coordinateString}`;
    urlConstruct += `!5e0!3m2!1spt-BR!2sbr!4v${epochNow}000!5m2!1spt-BR!2sbr`;
    iframe.src = urlConstruct;
}
// exibindo informações da empresa selecionada
function splitPhoneNumber(contato){
    // zerando os números de telefone, quando trocar de empresa
    empresaContato.innerHTML = "";
    // separando os números de telefone, se houver mais de um
    const listaContato = contato.split(',');
    // para cada número de telefone, criar um link para ligar
    listaContato.forEach((telefone) => {
        // criando um elemento br, para quebrar linha entre os números
        const quebraLinha = document.createElement("br");
        // criando um elemento a, para criar um link para ligar
        const telefoneNumero = document.createElement("a");
        // o texto do link será o número de telefone
        telefoneNumero.innerHTML = telefone;
        // o link será o número de telefone
        telefoneNumero.href = `tel:${telefone}`;
        // adicionando o número de telefone ao contato da empresa
        empresaContato.appendChild(telefoneNumero);
        // adicionando a quebra de linha, para separar os números
        empresaContato.appendChild(quebraLinha);
    })
}
// mostrando informação da empresa
function showCompanyInfo(empresa) {
    empresaNome.innerHTML = empresa.Nome;
    empresaAtividade.innerHTML = "Atividade: " + empresa.Atividade;
    empresaEndereco.innerHTML = "Endereço: " + empresa.Endereço;
    splitPhoneNumber(empresa.Contato);
}
function resetJourneyConfirmation() {
    apagarItinerario.showModal();
}
// resetando as informações da empresa
function resetJourney(){
    listaEmpresasItinerario = [];
    // removendo as empresas da lista de itinerario
    const itinerarioLista = document.getElementById("itinerario-lista");
    itinerarioLista.innerHTML = "";
    defaultItineario.innerHTML = "Nenhum itinerário disponível.";
    apagarItinerario.close();
    // removendo o botão de mostrar informações das empresas
    btnEmpresa.classList.add("d-none");
    checkItinerario();
}
// mostrando as informações da empresa anterior
function previousCompany() {
    if (empresaIndex > 0) {
        empresaIndex--;
        showCompanyInfo(listaEmpresasItinerario[empresaIndex]);
    }
}
// mostrando as informações da empresa seguinte
function nextCompany() {
    if (empresaIndex < listaEmpresasItinerario.length - 1) {
        empresaIndex++;
        showCompanyInfo(listaEmpresasItinerario[empresaIndex]);
    }
}
// realizando a pesquisa
function searchOption() {
    // mostrando informações das empresas
    btnEmpresa.classList.remove("d-none");
    const select = document.getElementById("empresas");
    // se não houver nenhuma empresa no select === api offline
    if (select.options.length === 0) {
        offline.showModal();
    } else {
        showCompanyInfo(listaEmpresasItinerario[0]);
        createUrlMap(listaEmpresasCoordenadas);
    }
}
// fechando os dialogs
// https://stackoverflow.com/questions/50037663/how-to-close-a-native-html-dialog-when-clicking-outside-with-javascript
function dialogClickHandler(e) {
    if (e.target.tagName !== 'DIALOG') {
        //This prevents issues with forms
        return;
    } 
    const rect = e.target.getBoundingClientRect();
    const clickedInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
    );
    if (clickedInDialog === false) {
        e.target.close();
    }
}
function closeWarning(){
    warning.close();
}
function closeError(){
    error.close();
}
function closeApagarItinerario() {
    apagarItinerario.close();
}
function closeErrorItinerario(){
    errorItinerario.close();
}
function closeErrorNaoItinerario(){
    errorNaoItinerario.close();
}
function closeOffline(){
    offline.close();
}