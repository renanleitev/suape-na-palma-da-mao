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
const apagarItinerarioSucesso = document.getElementById("apagar-itinerario-sucesso");
const apagarHistoricoItinerario = document.getElementById("apagar-historico-itinerario");
const apagarHistoricoItinerarioSucesso = document.getElementById("apagar-historico-itinerario-sucesso");
const offline = document.getElementById("offline");
const salvarItinerario = document.getElementById("salvar-itinerario");
const restaurarItinerario = document.getElementById("restaurar-itinerario");
const vazioItinerario = document.getElementById("vazio-itinerario");
const vazioHistoricoItinerario = document.getElementById("vazio-historico-itinerario");
// mensagem padrão do itinerario
const defaultItinerario = document.getElementById("default-itinerario");
// mensagem padrão do histórico do itinerario
const defaultItinerarioHistorico = document.getElementById("default-itinerario-historico");
// obtendo as informações das empresas
const empresaNome = document.getElementById('empresa-nome');
const empresaAtividade = document.getElementById('empresa-atividade');
const empresaEndereco = document.getElementById('empresa-endereco');
const empresaContato = document.getElementById('empresa-contato');
// delay para exibir os avisos na tela (2000 = 2 segundos)
const delayTime = 2000;
// armazenando as empresas obtidas com a api
let listaEmpresas = [];
// armazenando as empresas adicionadas ao itinerário (se não houver, a lista é vazia)
let listaEmpresasItinerario = JSON.parse(localStorage.getItem("itinerario")) || [];
// salvando o histórico do itinerario
let listaEmpresasItinerarioHistorico = [];
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
// checando se há ou não empresas no itinerario
checkItinerario();
// fazendo a requisição GET
fetch(initialUrl, options)
    .then((resposta) => resposta.json())
    .then(data => {
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
    // botão de mostrar informações da empresa
    const empresaButton = document.getElementById("empresa-button");
    // se não houver nenhuma empresa no itinerario
    if (listaEmpresasItinerario.length === 0) {
        // desabilitar o botão de pesquisa
        pesquisarButton.disabled = true;
        // a cor de fundo do botão fica cinza
        pesquisarButton.style.backgroundColor = "gray";
        // removendo o botão de empresa
        empresaButton.classList.add("d-none");
    } else if (listaEmpresasItinerario.length > 0) {
        // se houver empresa no itinerario, a pesquisa fica habilitada
        pesquisarButton.disabled = false;
        // a cor de fundo do botão fica branca
        pesquisarButton.style.backgroundColor = "white";
        // adicionando o botão da empresa
        empresaButton.classList.remove("d-none");
    }
    // selecionando o contador de empresas no itinerario
    const itinerarioCount = document.getElementById("itinerario-count");
    // o contador será a quantidade de empresas no itinerario
    itinerarioCount.innerHTML = listaEmpresasItinerario.length;
}
// adicionando empresa ao itinerario
function addToListJourney(empresa) {
    // removendo a mensagem de nenhum itinerario
    defaultItinerario.innerHTML = "";
    // adicionando a empresa na lista de itinerario
    const itinerarioLista = document.getElementById("itinerario-lista");
    // criando um elemento li (item) para adicionar a lista de itinerario
    const itinerarioItem = document.createElement("li");
    // o texto de cada item da lista será o nome da empresa
    itinerarioItem.innerHTML = empresa.Nome;
    // definindo as cores para o texto
    itinerarioItem.style.color = "black";
    // adicionando a empresa a lista de itinerario
    itinerarioLista.appendChild(itinerarioItem);
}
// adicionando empresa ao historico de itinerario
function addToHistoryJourney(empresa) {
    // removendo a mensagem de nenhum itinerario
    defaultItinerarioHistorico.innerHTML = "";
    // adicionando a empresa na lista de itinerario
    const itinerarioHistoricoLista = document.getElementById("itinerario-historico-lista");
    // criando um elemento li (item) para adicionar a lista de itinerario
    const itinerarioItem = document.createElement("li");
    // o texto de cada item da lista será o nome da empresa
    itinerarioItem.innerHTML = empresa.Nome;
    // o id de cada item da lista será o nome da empresa
    itinerarioItem.id = empresa.Nome;
    // definindo as cores para o texto
    itinerarioItem.style.color = "black";
    // adicionando a empresa a lista de itinerario
    itinerarioHistoricoLista.appendChild(itinerarioItem);
}
// removendo empresa do itinerario
function removeCompanyFromJourney() {
    try {
        // removendo a última empresa do itinerario e das coordenadas
        listaEmpresasItinerario.pop();
        listaEmpresasCoordenadas.pop();
        // se o itinerario estiver vazio, exibir mensagem
        if (listaEmpresasItinerario.length === 0) {
            defaultItinerario.innerHTML = "Nenhum itinerário disponível.";
        }
        // removendo a empresa da lista de itinerario
        const itinerarioLista = document.getElementById("itinerario-lista");
        itinerarioLista.removeChild(itinerarioLista.lastChild);
        // checando se há ou não empresas no itinerario
        checkItinerario();
    } catch(e) {
        // se a empresa não estiver no itinerario, exibir mensagem de erro
       console.log(e);
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
        const empresaEncontrada = listaEmpresas.find(empresa => empresa.Nome.match(regex));
        // se a empresa for encontrada
        if (empresaEncontrada) {
            addCompanyToJourney(empresaEncontrada);
            // checando se há ou não empresas no itinerario
            checkItinerario();
        } else {
            // se a empresa não for encontrada
            error.showModal();
        }
    } else {
        // se o input estiver vazio, obter os valores pelo select
        const empresasSelect = document.getElementById("empresas");
        // obtendo o nome da empresa
        const empresaSelecionada = empresasSelect.options[empresasSelect.selectedIndex].text;
        // obtendo os dados completos da empresa
        const empresaEncontrada = listaEmpresas.find((empresa) => empresa.Nome === empresaSelecionada);
        // adicionando empresa ao itinerario
        addCompanyToJourney(empresaEncontrada);
        // checando se há ou não empresas no itinerario
        checkItinerario();
    }
}
// removendo empresas do itinerario
function removeCompany() {
    if (listaEmpresasItinerario.length === 0) {
        // se o itinerario estiver vazio, exibir mensagem de itinerario vazio
        vazioItinerario.showModal();
    } else {
        // se o itinerario não estiver vazio, remover empresa do itinerario
        removeCompanyFromJourney();
    }
}
// invertendo o itinerario
function invertJourney() {
    if (listaEmpresasItinerario.length === 0) {
        // se o itinerário estiver vazio, exibir mensagem de itinerario vazio
        defaultItinerario.innerHTML = "Nenhum itinerário disponível.";
    } else {
        // se o itinerário não estiver vazio, apagar mensagem anterior
        defaultItinerario.innerHTML = "";
        // invertendo a lista de itinerario
        listaEmpresasItinerario.reverse();
        // invertendo as coordenadas
        listaEmpresasCoordenadas.reverse();
        const itinerarioLista = document.getElementById("itinerario-lista");
        // a lista fica vazia
        itinerarioLista.innerHTML = "";
        // para cada empresa no itinerario, ela é adicionada a lista de itinerario
        listaEmpresasItinerario.forEach((empresa) => {
            addToListJourney(empresa);
        });
    }
}
// invertendo o historico do itinerario
function invertHistoryJourney() {
    if (listaEmpresasItinerarioHistorico.length === 0){
        // se o histórico de itinerario estiver vazio, exibir mensagem de histórico vazio
        defaultItinerarioHistorico.innerHTML = "Nenhum histórico de itinerário disponível.";
    } else {
        // se o histórico de itinerario não estiver vazio, apagar mensagem anterior
        defaultItinerarioHistorico.innerHTML = "";
        // invertendo a lista de itinerario
        listaEmpresasItinerarioHistorico.reverse();
        // selecionando a lista de histórico de itinerario
        const itinerarioHistoricoLista = document.getElementById("itinerario-historico-lista");
        // a lista fica vazia
        itinerarioHistoricoLista.innerHTML = "";
        // para cada empresa no histórico, ela é adicionada a lista de histórico de itinerário
        listaEmpresasItinerarioHistorico.forEach((empresa) => {
            addToHistoryJourney(empresa);
        });
        // salvando no historico
        localStorage.setItem("itinerario", JSON.stringify(listaEmpresasItinerarioHistorico));
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
// https://horadecodar.com.br/como-salvar-arrays-na-localstorage-de-javascript/ 
function showHistoryJourney() {
    // obtendo o histórico do localStorage
    listaEmpresasItinerarioHistorico = JSON.parse(localStorage.getItem("itinerario"));
    // se o historico estiver vazio, exibir mensagem de historico vazio
    if (!listaEmpresasItinerarioHistorico || listaEmpresasItinerarioHistorico.length === 0) {
        // exibindo mensagem de histórico vazio
        defaultItinerarioHistorico.innerHTML = "Nenhum histórico de itinerário disponível.";
    } else {
        // selecionando a lista de histórico
        const itinerarioHistoricoLista = document.getElementById("itinerario-historico-lista");
        // zerando a lista de histórico
        itinerarioHistoricoLista.innerHTML = "";
        // para cada empresa na lista de histórico, adicionar a empresa na lista
        listaEmpresasItinerarioHistorico.forEach((empresa) => {
            addToHistoryJourney(empresa);
        });
    }
}
function restoreHistoryJourney() {
    // se o historico estiver vazio, exibir modal de histórico vazio
    if (!listaEmpresasItinerarioHistorico || listaEmpresasItinerarioHistorico.length === 0) {
        vazioHistoricoItinerario.showModal();
    } else {
        // se não estiver vazio, a lista de itinerario será a lista de histórico
        listaEmpresasItinerario = listaEmpresasItinerarioHistorico;
        // zerando a lista de coordenadas
        listaEmpresasCoordenadas = [];
        // selecionando a lista de itinerario
        const itinerarioLista = document.getElementById("itinerario-lista");
        // zerando a lista de itinerario
        itinerarioLista.innerHTML = "";
        // para cada empresa no itinerario, adicionar a empresa na lista e nas coordenadas
        listaEmpresasItinerario.forEach((empresa) => {
            addToListJourney(empresa);
            listaEmpresasCoordenadas.push({
                lat: empresa.Latitude,
                lon: empresa.Longitude,
            });
        });
        // itinerario restaurado com sucesso
        restaurarItinerario.showModal();
        // checando se há ou não empresas no itinerario
        checkItinerario();
        // realizando a pesquisa (usuário não precisa perder tempo clicando em pesquisar)
        searchOption();
    }
}
function saveJourney() {
    // se o itinerario estiver vazio, não salvar no localStorage
    if (listaEmpresasItinerario.length === 0) {
        vazioItinerario.showModal();
    } else {
        // mensagem de salvo com sucesso
        salvarItinerario.showModal();
        // checando se há ou não empresas no itinerario
        checkItinerario();
        // se o itinerario não estiver vazio, salvar no localStorage
        localStorage.setItem("itinerario", JSON.stringify(listaEmpresasItinerario));
    }
}
function resetJourneyConfirmation() {
    // se o itinerario estiver vazio, exibir modal de itinerario vazio
    if (listaEmpresasItinerario.length === 0) {
        vazioItinerario.showModal();
    } else {
        // se o itinerario não estiver vazio, exibir modal para apagar o itinerario
        apagarItinerario.showModal();
    }
}
function resetHistoryJourneyConfirmation() {
    // se o historico estiver vazio, exibir modal de histórico vazio
    if (!listaEmpresasItinerarioHistorico || listaEmpresasItinerarioHistorico.length === 0) {
        vazioHistoricoItinerario.showModal();
    } else {
        // se o historico não estiver vazio, exibir modal para apagar histórico
        apagarHistoricoItinerario.showModal();
    }
}
// resetando (apagando) o itinerario
function resetJourney() {
    // a lista de empresas no itinerario fica vazia
    listaEmpresasItinerario = [];
    // removendo as empresas da lista de itinerario
    const itinerarioLista = document.getElementById("itinerario-lista");
    // a lista fica vazia
    itinerarioLista.innerHTML = "";
    // exibindo mensagem de nenhum itinerario disponível
    defaultItinerario.innerHTML = "Nenhum itinerário disponível.";
    // fechando o modal de apagar itinerario
    apagarItinerario.close();
    // abrindo o modal de itinerario apagado com sucesso
    apagarItinerarioSucesso.showModal();
    // checando se há ou não empresas no itinerario
    checkItinerario();
}
// resetando (apagando) o histórico de itinerario
function resetHistoryJourney() {
    // o historico de itinerario fica vazio
    listaEmpresasItinerarioHistorico = [];
    // salvando o histórico vazio no localStorage
    localStorage.setItem("itinerario", JSON.stringify(listaEmpresasItinerarioHistorico));
    // removendo as empresas da lista de histórico de itinerario
    const itinerarioHistoricoLista = document.getElementById("itinerario-historico-lista");
    // a lista de histórico fica vazia
    itinerarioHistoricoLista.innerHTML = "";
    // exibindo mensagem de nenhum histórico de itinerario disponível
    defaultItinerarioHistorico.innerHTML = "Nenhum histórico de itinerário disponível.";
    // fechando o modal de apagar histórico de itinerario
    apagarHistoricoItinerario.close();
    // abrindo o modal de histórico itinerario apagado com sucesso
    apagarHistoricoItinerarioSucesso.showModal();
    // checando se há ou não empresas no itinerario
    checkItinerario();
}
// mostrando as informações da empresa anterior
function previousCompany() {
    // se o índice atual é maior que zero, é possível exibir uma empresa anterior
    if (empresaIndex > 0) {
        empresaIndex--;
        showCompanyInfo(listaEmpresasItinerario[empresaIndex]);
    }
}
// mostrando as informações da empresa seguinte
function nextCompany() {
    // se o índice atual é menor que o comprimento da lista, é possível exibir uma empresa posterior
    if (empresaIndex < listaEmpresasItinerario.length - 1) {
        empresaIndex++;
        showCompanyInfo(listaEmpresasItinerario[empresaIndex]);
    }
}
// mostrando as informações da empresa
function showDefaultCompanyInfo() {
    showCompanyInfo(listaEmpresasItinerario[0]);
}
// realizando a pesquisa
function searchOption() {
    const select = document.getElementById("empresas");
    // se não houver nenhuma empresa no select === api offline
    if (select.options.length === 0) {
        // abrindo modal de api offline
        offline.showModal();
    } else {
        // se a api estiver online, exibir a primeira empresa no itinerario
        showDefaultCompanyInfo();
        // realizar a consulta da rota no mapa
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
function closeVazioItinerario() {
    vazioItinerario.close();
}
function closeVazioHistoricoItinerario() {
    vazioHistoricoItinerario.close();
}
function closeRestaurarItinerario() {
    restaurarItinerario.close();
}
function closeSalvarItinerario() {
    salvarItinerario.close();
}
function closeApagarItinerario() {
    apagarItinerario.close();
}
function closeApagarItinerarioSucesso() {
    apagarItinerarioSucesso.close();
}
function closeApagarHistoricoItinerario() {
    apagarHistoricoItinerario.close();
}
function closeApagarHistoricoItinerarioSucesso() {
    apagarHistoricoItinerarioSucesso.close();
}
function closeOffline() {
    offline.close();
}