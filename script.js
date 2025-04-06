function exibirDetalhes(nome, ingredientes, modo) {
    document.getElementById('modal-title').textContent = nome;
    document.getElementById('modal-ingredientes').textContent = ingredientes;
    document.getElementById('modal-modo').textContent = modo;
    document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const sucesso = document.createElement('div');
    sucesso.id = "mensagem-sucesso";
    sucesso.textContent = "Receita adicionada com sucesso!";
    sucesso.style.display = "none";
    form && form.appendChild(sucesso);

    form && form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = form.querySelector('input[name="nome"]').value.trim();
        const ingredientes = form.querySelector('textarea[name="ingredientes"]').value.trim();
        const modo = form.querySelector('textarea[name="modo"]').value.trim();
        const imagemInput = form.querySelector('input[name="imagem"]');
        const imagemArquivo = imagemInput.files[0];

        if (!nome || !ingredientes || !modo) {
            alert("Por favor, preencha todos os campos da receita.");
            return;
        }

        function adicionarReceita(imagemSrc = '') {
            const novaReceita = document.createElement("div");
            novaReceita.className = "receita";
            novaReceita.innerHTML = `
                ${imagemSrc ? `<img src="${imagemSrc}" alt="Imagem da Receita" class="imagem-receita">` : ''}
                <h3>${nome}</h3>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                <p><strong>Modo de preparo:</strong> ${modo}</p>
                <button class="btn-excluir">Excluir</button>
            `;

            const lista = document.getElementById("lista-receitas");
            lista.appendChild(novaReceita);

            novaReceita.querySelector(".btn-excluir").addEventListener("click", () => {
                novaReceita.remove();
            });

            sucesso.style.display = "block";
            setTimeout(() => {
                sucesso.style.display = "none";
            }, 3000);

            form.reset();
        }

        if (imagemArquivo) {
            const reader = new FileReader();
            reader.onload = function (event) {
                adicionarReceita(event.target.result);
            };
            reader.readAsDataURL(imagemArquivo);
        } else {
            adicionarReceita();
        }
    });

    // Botão voltar ao topo
    const btnTopo = document.createElement("button");
    btnTopo.id = "btnTopo";
    btnTopo.textContent = "↑";
    document.body.appendChild(btnTopo);

    window.addEventListener("scroll", function () {
        btnTopo.style.display = window.scrollY > 200 ? "block" : "none";
    });

    btnTopo.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
