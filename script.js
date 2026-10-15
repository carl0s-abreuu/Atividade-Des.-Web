// O array guarda os cadastros enquanto a página está aberta.
const estudantes = [];
const formulario = document.getElementById('formulario');
const campoNome = document.getElementById('nome');
const campoTurma = document.getElementById('turma');
const campoCurso = document.getElementById('curso');
const mensagem = document.getElementById('mensagem');

// Reconstrói a tabela e a lista com os dados atuais do array.
function atualizarExibicao() {
  const tabela = document.getElementById('corpo-tabela');
  const lista = document.getElementById('lista-estudantes');
  tabela.replaceChildren();
  lista.replaceChildren();

  estudantes.forEach(function (estudante, indice) {
    const linha = document.createElement('tr');

    // textContent exibe os dados como texto, sem interpretar HTML.
    [estudante.nome, estudante.turma, estudante.curso].forEach(function (valor) {
      const celula = document.createElement('td');
      celula.textContent = valor;
      linha.appendChild(celula);
    });

    const celulaAcao = document.createElement('td');
    const botaoExcluir = document.createElement('button');
    botaoExcluir.type = 'button';
    botaoExcluir.className = 'excluir';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.setAttribute('aria-label', 'Excluir cadastro de ' + estudante.nome);
    botaoExcluir.addEventListener('click', function () {
      estudantes.splice(indice, 1);
      atualizarExibicao();
      mensagem.textContent = 'Cadastro de ' + estudante.nome + ' excluído.';
      campoNome.focus();
    });
    celulaAcao.appendChild(botaoExcluir);
    linha.appendChild(celulaAcao);
    tabela.appendChild(linha);

    const item = document.createElement('li');
    item.textContent = estudante.nome + ' — Turma ' + estudante.turma + ' — ' + estudante.curso;
    lista.appendChild(item);
  });

  document.getElementById('total').textContent = estudantes.length;
  document.getElementById('tabela-vazia').hidden = estudantes.length > 0;
  document.getElementById('lista-vazia').hidden = estudantes.length > 0;
}

// Impede o recarregamento e adiciona o novo estudante.
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nome = campoNome.value.trim();
  const turma = campoTurma.value.trim();
  const curso = campoCurso.value.trim();

  // required verifica campos vazios; trim também rejeita apenas espaços.
  if (!nome || !turma || !curso) {
    mensagem.textContent = 'Preencha todos os campos com informações válidas.';
    const campoVazio = [campoNome, campoTurma, campoCurso].find(function (campo) {
      return !campo.value.trim();
    });
    campoVazio.focus();
    return;
  }

  estudantes.push({ nome: nome, turma: turma, curso: curso });
  atualizarExibicao();
  formulario.reset();
  mensagem.textContent = 'Estudante cadastrado com sucesso!';
  campoNome.focus();
});

formulario.addEventListener('reset', function () {
  mensagem.textContent = '';
});

atualizarExibicao();
