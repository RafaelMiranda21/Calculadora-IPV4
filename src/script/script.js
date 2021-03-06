let input = document.querySelectorAll('.input');
let ipv4Dec = document.getElementById('ipv4Dec');
let ipv4B = document.getElementById('ipv4B');
let mascara_subRedeBin = document.getElementById('mascara_subRedeBin');
let mascara_subRedeDec = document.getElementById('mascara_subRedeDec');
let IntervaloI = document.getElementById('IntervaloI');
let IntervaloIBIN = document.getElementById('IntervaloIBIN'); //pegando os elementos
let IntervaloF = document.getElementById('IntervaloF');
let IntervaloFBIN = document.getElementById('IntervaloFBIN');
let Sub_RedeDec = document.getElementById('Sub_RedeDec');
let Sub_RedeBin = document.getElementById('Sub_RedeBin');
let Sub_BroadDec = document.getElementById('Sub_BroadDec');
let Sub_BroadBin = document.getElementById('Sub_BroadBin');
let hosts_subredes = document.getElementById('hosts_subredes');
let area_calc = document.querySelectorAll('.area-calc');
let armazenar;
document.querySelector('.bgd-video').playbackRate = .70;



function bin(dec) {
    return (dec >>> 0).toString(2); //transforma decimal em binario

}

function zeros(valor, tamanho) {
    for (let i = 0; i < tamanho; i++) { //adiciona zeros a esquerda para completar o octeto
        valor = "0" + valor;
    }
    return valor;
}

function uns(valor, tamanho) {
    for (let i = 0; i < tamanho; i++) { //adiciona uns a esquerda para completar o octeto
        valor = "1" + valor;
    }
    return valor;
}




for (let i = 0; i < input.length; i++) { //muda o cursor quando atinge 3 caracteres
    input[i].addEventListener('input', function() {
        if (input[i].value.length >= 3 && (i != (input.length - 1))) {
            input[i + 1].focus();
        }
    });
}


function mascara(props) { //retorna o tanto de host
    let masc = document.getElementById('input_masc');
    let mascara;
    if (props > 0) {
        mascara = props;
    } else {
        mascara = masc.value;
    }
    return 32 - mascara;
}

function geraMascara(props) { //gera a mascara da rede
    let valueMascara = mascara(props);
    let mascara1 = "";
    let mascara2 = "";
    let mascara3 = "";
    let mascara4 = "";
    let flag = 0;


    while (flag < valueMascara) {
        if (mascara2.length == 8 && mascara1.length < 8) {
            mascara1 += "0";
        }
        if (mascara3.length == 8 && mascara2.length < 8) {
            mascara2 += "0";
        }
        if (mascara4.length == 8 && mascara3.length < 8) {
            mascara3 += "0";
        }
        if (mascara4.length < 8) {
            mascara4 += "0";
        }



        flag++;
    }
    if (mascara1.length < 8) {
        mascara1 = uns(mascara1, 8 - mascara1.length);
    }
    if (mascara2.length < 8) {
        mascara2 = uns(mascara2, 8 - mascara2.length);
    }
    if (mascara3.length < 8) {
        mascara3 = uns(mascara3, 8 - mascara3.length);
    }
    if (mascara4.length < 8) {
        mascara4 = uns(mascara4, 8 - mascara4.length);
    }



    valueMascara = 32 - valueMascara;
    let mascarabin = mascara1 + "." + mascara2 + "." + mascara3 + "." + mascara4 + "/" + valueMascara;
    let mascaradec = parseInt(mascara1, 2) + "." + parseInt(mascara2, 2) + "." + parseInt(mascara3, 2) + "." + parseInt(mascara4, 2) + "/" + valueMascara;
    mascara1 = parseInt(mascara1);
    andMascara1 = parseInt(input[0].value);
    mascara2 = parseInt(mascara2);
    andMascara2 = parseInt(input[1].value);
    mascara3 = parseInt(mascara3);
    andMascara3 = parseInt(input[2].value);
    mascara4 = parseInt(mascara4);
    andMascara4 = parseInt(input[3].value);
    andMascara1 = mascara1 & andMascara1;
    andMascara2 = mascara2 & andMascara2;
    andMascara3 = mascara3 & andMascara3;
    andMascara4 = mascara4 & andMascara4;
    iprede = andMascara1 + "." + andMascara2 + "." + andMascara3 + "." + andMascara4;
    return [mascarabin, mascaradec, iprede];
}

function geraRede(val, input) { //gera a rede primeiro Ip
    let resul = [];
    resul[0] = val[0] & input[0].value;
    resul[1] = val[1] & input[1].value;
    resul[2] = val[2] & input[2].value;
    resul[3] = val[3] & input[3].value;
    return resul;
}

function geraBrod(val, input) { //gera o broadcast ultimo Ip

    let result = [];
    let broad = [];
    result[0] = ~val[0] & 0xFF;
    result[1] = ~val[1] & 0xFF;
    result[2] = ~val[2] & 0xFF;
    result[3] = ~val[3] & 0xFF;

    broad[0] = result[0] | input[0].value;
    broad[1] = result[1] | input[1].value;
    broad[2] = result[2] | input[2].value;
    broad[3] = result[3] | input[3].value;
    return broad;

}

function escondeSub() { //aqui faz aparecer somente o tanto de sub-redes que pode ser calculados
    let sub = document.querySelectorAll('.sub');
    let val = Math.pow(2, mascara(0));
    for (let i = 0; i < sub.length; i++) {
        sub[i].className = sub[i].className.replace(' hidden', '');
        if (sub[i].value > val) {
            sub[i].classList.add('hidden');
        }
    }
}

function convertBin(val) { //gera o ip em binario
    if (val == input) {
        result = val[0].value + "." + val[1].value + "." + val[2].value + "." + val[3].value;
        result = result.trim();
        resultC1 = bin(val[0].value);
        resultC1 = zeros(resultC1, 8 - resultC1.length);
        resultC2 = bin(val[1].value);
        resultC2 = zeros(resultC2, 8 - resultC2.length);
        resultC3 = bin(val[2].value);
        resultC3 = zeros(resultC3, 8 - resultC3.length);
        resultC4 = bin(val[3].value);
        resultC4 = zeros(resultC4, 8 - resultC4.length);
        resultBin = resultC1 + "." + resultC2 + "." + resultC3 + "." + resultC4;
    } else {
        result = val[0] + "." + val[1] + "." + val[2] + "." + val[3];
        result = result.trim();
        resultC1 = bin(val[0]);
        resultC1 = zeros(resultC1, 8 - resultC1.length);
        resultC2 = bin(val[1]);
        resultC2 = zeros(resultC2, 8 - resultC2.length);
        resultC3 = bin(val[2]);
        resultC3 = zeros(resultC3, 8 - resultC3.length);
        resultC4 = bin(val[3]);
        resultC4 = zeros(resultC4, 8 - resultC4.length);
        resultBin = resultC1 + "." + resultC2 + "." + resultC3 + "." + resultC4;
    }
    return resultBin;
}


function IPV4(props) { //monta os ips 
    let intervaloI = [];
    let intervaloF = [];
    let mascaras = geraMascara(props);
    let mascaraDec = mascaras[1];
    let mascara = mascaraDec.split(".");
    let mascaraT = mascara[3].split("/");
    mascara[3] = mascaraT[0];
    let rede = geraRede(mascara, input);
    let redeBin = convertBin(rede);
    let broad = geraBrod(mascara, input);
    let broadBin = convertBin(broad);


    ipv4 = input[0].value + "." + input[1].value + "." + input[2].value + "." + input[3].value;
    ipv4 = ipv4.trim();
    ipv4Bin = convertBin(input);
    intervaloI = rede[0] + "." + rede[1] + "." + rede[2] + "." + (rede[3] + 1);
    primeiroBin = intervaloI.split(".");
    primeiroBin = convertBin(primeiroBin);
    intervaloF = broad[0] + "." + broad[1] + "." + broad[2] + "." + (broad[3] - 1);
    ultimoBin = intervaloF.split(".");
    ultimoBin = convertBin(ultimoBin);
    rede = rede[0] + "." + rede[1] + "." + rede[2] + "." + rede[3];

    broad = broad[0] + "." + broad[1] + "." + broad[2] + "." + broad[3];
    return [rede, broad, intervaloI, intervaloF, ipv4, ipv4Bin, redeBin, broadBin, primeiroBin, ultimoBin];

}

function prep_sub() { //aqui eu pego o valor do input de sub-redes

    input[3].value = armazenar; //garante que o 3 campo seja o mesmo sempre
    var select = document.getElementById('subRede');
    var value = select.options[select.selectedIndex].value;
    resultado = document.getElementById('resultado');
    let valueMascara = mascara(0);
    valueMascara = 32 - valueMascara + Math.log2(value);
    result_subs = document.querySelectorAll(".result_subs");
    resultado.innerHTML = ``; //limpa a div de resultados

    //coloca os titulos
    resultado.innerHTML += ` 
             <div class="result_subs" id="class="result_subs">
                <div class="result_rede result" id="result_rede "><h2>Sub-Rede</h2></div> 
                <div class="result_rede result" id="result_rede "><h2>Rede</h2></div>
                <div class="result_inter result" id="result_inter "><h2>Intervalo Inicial</h2></div>
                <div class="result_broad result" id="result_rede "><h2>Intervalo Final</h2></div>  
                <div class="result_broad result" id="result_rede "><h2>Broadcast</h2></div> 
                         
             </div>
         `
    for (let i = 0; i < value; i++) {
        sub = IPV4(valueMascara);
        resultado.innerHTML += `
             <div class="result_subs" id="class="result_subs">
                 <div class="result_rede result" id="result_rede "><span>` + i + `</span></div>
                <div class="result_rede result" id="result_rede "><span class="resultDec">` + sub[0] + `/` + valueMascara + `</span> <span class="resultBin">` + sub[6] + `</span></div>
                <div class="result_inter result" id="result_inter "><span class="resultDec">` + sub[2] + `/` + valueMascara + `</span> <span class="resultBin">` + sub[8] + `</span></div>
                <div class="result_inter result" id="result_inter "><span class="resultDec">` + sub[3] + `/` + valueMascara + `</span> <span class="resultBin">` + sub[9] + `</span></div>
                <div class="result_broad result" id="result_rede "><span class="resultDec">` + sub[1] + `/` + valueMascara + `</span> <span class="resultBin">` + sub[7] + `</span></div>        
             </div>
         `
        let broad = sub[1].split(".");
        input[3].value = parseInt(broad[3]) + 1;
    }
    window.location.href = "#resultado";
}

function rede() { //faz mostrar na tela os resultados gerados
    escondeSub();
    remover = document.querySelectorAll('.remover');
    console.log(remover);
    for (let i = 0; i < (area_calc.length - 1); i++) {
        if (remover.length > 1) {
            area_calc[i].removeChild(document.getElementById('remover'));
        }
    }
    hosts_subredes.innerHTML += `<span class="remover decimal" id="remover">` + Math.pow(2, mascara(0)) + `</span>`;
    mascaras = geraMascara(0);
    mascara_subRedeBin.innerHTML += `<span class="remover binario" id="remover">` + mascaras[0] + `</span>`;
    mascara_subRedeDec.innerHTML += `<span class="remover decimal" id="remover">` + mascaras[1] + `</span>`;
    sub = IPV4(0);
    Sub_RedeDec.innerHTML += `<span class="remover decimal" id="remover">` + sub[0] + `</span>`;
    Sub_RedeBin.innerHTML += `<span class="remover binario" id="remover">` + sub[6] + `</span>`;
    Sub_BroadDec.innerHTML += `<span class="remover decimal" id="remover">` + sub[1] + `</span>`;
    Sub_BroadBin.innerHTML += `<span class="remover binario" id="remover">` + sub[7] + `</span>`;
    IntervaloI.innerHTML += `<span class="remover decimal" id="remover">` + sub[2] + `</span>`;
    IntervaloIBIN.innerHTML += `<span class="remover binario" id="remover">` + sub[8] + `</span>`;
    IntervaloF.innerHTML += `<span class="remover decimal" id="remover">` + sub[3] + `</span>`;
    IntervaloFBIN.innerHTML += `<span class="remove binario" id="remover">` + sub[9] + `</span>`;
    ipv4Dec.innerHTML += `<span class="remover decimal" id="remover">` + sub[4] + `</span>`;
    ipv4B.innerHTML += `<span class="remover binario" id="remover">` + sub[5] + `</span>`;
    armazenar = input[3].value; // armazena o 4 campo do ip
}