// definindo as coordenadas iniciais
let latitude = -8.394097983524112;
let longitude = -34.97408204488957;
const iframe = document.getElementById("google-maps");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
// carregando a página
loading.showModal();
function getPositionSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    loading.close();
}
function getPositionError() {
    iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    loading.close();
}
navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);
// obtendo os dados das empresas
const initialUrl = "http://localhost:3000/empresa/";
const options =
{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "GET",
};
fetch(initialUrl, options)
    .then((resposta) => resposta.json())
    .then(data => {
        // adicionando nas opções
        data.forEach(empresa => {
            const option = document.createElement("option");
            option.text = empresa.Nome;
            option.value = `${empresa.Latitude},${empresa.Longitude}`;
            const select = document.getElementById("empresas");
            select.appendChild(option);
        });
    });
// Obtendo a url para o iframe
// https://medium.com/@supun1001/how-to-generate-google-embed-links-programmatically-for-iframes-for-routes-only-d6dc225e59e8
function createUrlMap(destinationLatitude, destinationLongitude){
    const origem = {
        lat: latitude,
        lon: longitude
    };
    const destino = {
        lat: destinationLatitude,
        lon: destinationLongitude
    }
    const coords = [origem, destino];
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
    urlConstruct += `!5e0!3m2!1sen!2sau!4v${epochNow}000!5m2!1sen!2sau`;
    iframe.src = urlConstruct;
}
// obtendo os valores pelo select
function getOption() {
    const coordenadasEmpresa = document.getElementById("empresas").value;
    const [empresaLatitude, empresaLongitude] = coordenadasEmpresa.split(',');
    createUrlMap(empresaLatitude, empresaLongitude);
}
// obtendo os valores pelo input
function searchOption(){
    const pesquisar = document.getElementById('pesquisar').value;
    const searchUrl = `http://localhost:3000/empresa/query/${pesquisar}`;
    loading.showModal();
    fetch(searchUrl, options)
        .then((resposta) => {
            if (resposta.status !== 200) {
                loading.close();
                error.showModal();
                setTimeout(() => error.close(), 2000);
                return;
            }
            return resposta.json();
        })
        .then(empresa => {
            createUrlMap(empresa.Latitude, empresa.Longitude);
            loading.close();
        });

}