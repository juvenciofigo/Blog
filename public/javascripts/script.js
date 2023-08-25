const filho = document.querySelector(".filho");

const categoryForm = document.getElementById("categoryForm");
const categoryIdInput = document.getElementById("category_id");

categoryForm.addEventListener("submit", function (event) {
    const categoryId = categoryIdInput.value;
    const actionUrl = `/admin/categories/edit/${categoryId}`;
    categoryForm.setAttribute("action", actionUrl);
});

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

console.log(2);
