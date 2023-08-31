console.log(document.querySelector(".first").style.marginLeft);
const container = document.querySelector(".cont").children.length;
var numero = 1;
var count = 0;
var direction = 1; // Direção inicial do movimento

setInterval(function () {
    count += 100 * direction;

    if (numero < container && numero > 0) {
        document.querySelector(".first").style.marginLeft = `-${count}%`;
    } else {
        direction *= -1; // Inverte a direção
        numero += direction; // Atualiza o número com a nova direção
        count += 100 * direction; // Atualiza o contador com a nova direção
        document.querySelector(".first").style.marginLeft = `-${count}%`;
    }

    numero += direction;
}, 3000);
