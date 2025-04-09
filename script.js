// Animação de entrada
window.addEventListener('load', () => {
    document.querySelectorAll('.animar').forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, 200 * i);
    });
});

// Salvar receitas localmente e carregar
document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista-receitas");

    // Carregar receitas do localStorage
    if (lista) {
        const receitas = JSON.parse(localStorage.getItem("receitas") || "[]");
        receitas.forEach(receita => {
            const nova = document.createElement("article");
            nova.className = "receita animar";
            nova.innerHTML = `
                <img src="${receita.imagem}" alt="${receita.nome}">
                <h3>${receita.nome}</h3>
                <p>${receita.descricao}</p>
            `;
            lista.appendChild(nova);
        });
    }

    // Adicionar nova receita
    const form = document.getElementById("form-receita");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const descricao = document.getElementById("descricao").value.trim();
            const imagemInput = document.getElementById("imagem");
            const arquivo = imagemInput.files[0];

            if (!nome || !descricao) return alert("Preencha todos os campos!");

            const reader = new FileReader();
            reader.onload = () => {
                const novaReceita = {
                    nome,
                    descricao,
                    imagem: reader.result
                };
                const receitasSalvas = JSON.parse(localStorage.getItem("receitas") || "[]");
                receitasSalvas.push(novaReceita);
                localStorage.setItem("receitas", JSON.stringify(receitasSalvas));
                alert("Receita adicionada com sucesso!");
                window.location.href = "index.html";
            };
            if (arquivo) {
                reader.readAsDataURL(arquivo);
            } else {
                novaReceita.imagem = "imagens/default.jpg"; // caso não tenha imagem
                alert("Receita adicionada com sucesso!");
                window.location.href = "index.html";
            }
        });
    }
});
