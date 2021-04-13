let input = document.querySelectorAll('.input');
let ipv4Dec = document.getElementById('ipv4Dec');
let ipv4B = document.getElementById('ipv4B');
let mascara_subRedeBin = document.getElementById('mascara_subRedeBin');
let mascara_subRedeDec = document.getElementById('mascara_subRedeDec');
let IntervaloI = document.getElementById('IntervaloI');
let IntervaloIBIN = document.getElementById('IntervaloIBIN');
let IntervaloF = document.getElementById('IntervaloF');
let IntervaloFBIN = document.getElementById('IntervaloFBIN');
let Sub_RedeDec = document.getElementById('Sub_RedeDec');
let Sub_RedeBin = document.getElementById('Sub_RedeBin');
let Sub_BroadDec = document.getElementById('Sub_BroadDec');
let Sub_BroadBin = document.getElementById('Sub_BroadBin');
let hosts_subredes = document.getElementById('hosts_subredes');
let area_calc = document.querySelectorAll('.area-calc');
document.querySelector('.bgd-video').playbackRate = .70;


function bin(dec) {
    return (dec >>> 0).toString(2);

}

function zeros(valor, tamanho) {
    for (let i = 0; i < tamanho; i++) {
        valor = "0" + valor;
    }
    return valor;
}

function uns(valor, tamanho) {
    for (let i = 0; i < tamanho; i++) {
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


function mascara() {
    let masc = document.getElementById('input_masc');
    let mascara = masc.value;
    return 32 - mascara;
}

function geraMascara() {
    let valueMascara = mascara();
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
    return [mascarabin, mascaradec];
}

function convertBin(val) {
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


function IPV4() {
    let rede = [];
    let broadcast = [];
    let intervaloI = [];
    let intervaloF = [];
    let mascaras = geraMascara();
    let mascaraDec = mascaras[1];
    let mascara = mascaraDec.split(".");
    let mascaraT = mascara[3].split("/");
    mascara[3] = mascaraT[0];

    for (let i = 0; i < 4; i++) {
        rede[i] = input[i].value;
        mascara[i] = mascara[i].trim();

        if (mascara[i] != 255) {
            rede[i] = 0;
        }
        if (rede[i] == 0) {
            broadcast[i] = 255;
        } else {
            broadcast[i] = rede[i];
        }
    }
    ipv4 = input[0].value + "." + input[1].value + "." + input[2].value + "." + input[3].value;
    ipv4 = ipv4.trim();
    ipv4Bin = convertBin(input);
    redeBin = convertBin(rede);
    broadBin = convertBin(broadcast);
    intervaloI = rede[0] + "." + rede[1] + "." + rede[2] + "." + (rede[3] + 1);
    primeiroBin = intervaloI.split(".");
    primeiroBin = convertBin(primeiroBin);
    intervaloF = broadcast[0] + "." + broadcast[1] + "." + broadcast[2] + "." + (broadcast[3] - 1);
    ultimoBin = intervaloF.split(".");
    ultimoBin = convertBin(ultimoBin);
    rede = rede[0] + "." + rede[1] + "." + rede[2] + "." + rede[3];
    broadcast = broadcast[0] + "." + broadcast[1] + "." + broadcast[2] + "." + broadcast[3];
    return [rede, broadcast, intervaloI, intervaloF, ipv4, ipv4Bin, redeBin, broadBin, primeiroBin, ultimoBin];

}

function rede() {
    remover = document.querySelectorAll('.remover');
    for (let i = 0; i < area_calc.length; i++) {
        if (remover.length > 1) {
            // console.log(area_calc[i]);
            area_calc[i].removeChild(document.getElementById('remover'));
        }
    }

    hosts_subredes.innerHTML += `<span class="remover decimal" id="remover">` + Math.pow(2, mascara()) + `</span>`;
    mascaras = geraMascara();
    mascara_subRedeBin.innerHTML += `<span class="remover binario" id="remover">` + mascaras[0] + `</span>`;
    mascara_subRedeDec.innerHTML += `<span class="remover decimal" id="remover">` + mascaras[1] + `</span>`;
    sub = IPV4();
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

}