const chaveDaApi = "97e1c2bdde4b4a55a1310143240807";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click",  async() => {
    const cidade = document.getElementById("input-busca").value;

    const dados = await buscarDadosDaCidade(cidade);

    if(dados) preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    try {
        const resposta = await fetch(apiUrl);

        if (resposta.status !== 200) return;

        const dados = await resposta.json();

        return dados;
    } catch (error) {
        console.error("Erro ao buscar os dados da cidade:", error);
    }
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const umidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura}ºC`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("umidade").textContent = `${umidade}%`;

    document.getElementById("velocidade-do-vento").textContent =`${velocidadeDoVento}Km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}