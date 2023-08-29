const filho = document.querySelector(".filho");
const categoryForm = document.getElementById("categoryForm");
const categoryIdInput = document.getElementById("category_id");
document.querySelector(".menuPhone").addEventListener("click", () =>{
    document.querySelector(".menulist").classList.toggle("hidden");
    document.querySelector(".menulist").classList.toggle("flex");
})
document.querySelector(".closeMenu").addEventListener("click", () =>{
    document.querySelector(".menulist").classList.toggle("hidden");
    document.querySelector(".menulist").classList.toggle("flex");
})









function clicado(event, form) {
    event.preventDefault();
    var articleId = articleIdInput.value;
    const articleIdInput = document.getElementById("article_id");
    const actionUrl = `/admin/articles/edit/${articleId}`;
    form.setAttribute("action", actionUrl);
    form.submit();
}


function confirmDeleteArt(event, form) {
    event.preventDefault();
    if (event.target.classList.contains("userDel")) {
        var decision = confirm("Voce quer remover este usuário?");
        if (decision) {
            form.submit();
        }
    } else if (event.target.classList.contains("articleDel")) {
        var decision = confirm("Voce quer apagar este artigo?");
        if (decision) {
            form.submit();
        }
    }else if (event.target.classList.contains("delCat")) {
        var decision = confirm("Voce quer apagar esta categoria?");
        if (decision) {
            form.submit();
        }
    }
}
function entrou(event) {
    filho.classList.add("w-48");
    filho.classList.remove("swing-in-top-reverse");
    filho.classList.remove("hidden");
    filho.classList.add("slide-in-elliptic-top-fwd");
}

function saiu(event) {
    filho.classList.remove("slide-in-elliptic-top-fwd");
    filho.classList.add("swing-in-top-reverse");
    if (filho.classList.contains("swing-in-top-reverse")) {
        setTimeout(() => {
            filho.classList.add("hidden");
            filho.classList.remove("w-48");
        }, 500);
    }
}


const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;
const images = carousel.querySelectorAll('img');
console.log(55)
const numImages = images.length;
const slideWidth = images[0].clientWidth;

function showSlide(index) {
  if (index < 0) {
    currentIndex = numImages - 1;
  } else if (index >= numImages) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const translateX = -currentIndex * slideWidth;
  carousel.style.transform = `translateX(${translateX}px)`;
}

prevButton.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

setInterval(() => {
  showSlide(currentIndex + 1);
}, 3000);

// Atualiza a largura do carrossel ao redimensionar a janela
window.addEventListener('resize', () => {
  showSlide(currentIndex);
});

// Inicializa o carrossel
showSlide(currentIndex);



categoryForm.addEventListener("submit", function (event) {
    const categoryId = categoryIdInput.value;
    const actionUrl = `/admin/categories/edit/${categoryId}`;
    categoryForm.setAttribute("action", actionUrl);
});
console.log(5)