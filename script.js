const horariosDisponiveis = [
  "09:00","10:00","11:00",
  "13:00","14:00","15:00",
  "16:00","17:00","18:00"
];

let horarioSelecionado = "";

function carregarHorarios() {
  const dia = document.getElementById("dia").value;
  const container = document.getElementById("horarios");
  container.innerHTML = "";
  horarioSelecionado = "";

  if (!dia) return;

  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || {};
  const ocupados = agendamentos[dia] || [];

  horariosDisponiveis.forEach(horario => {
    const btn = document.createElement("button");
    btn.innerText = horario;

    if (ocupados.includes(horario)) {
      btn.classList.add("ocupado");
      btn.disabled = true;
    } else {
      btn.onclick = () => selecionarHorario(btn, horario);
    }

    container.appendChild(btn);
  });
}

function selecionarHorario(botao, horario) {
  document.querySelectorAll(".horarios button").forEach(btn => {
    btn.classList.remove("selecionado");
  });

  botao.classList.add("selecionado");
  horarioSelecionado = horario;
}

function confirmarAgendamento() {
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const dia = document.getElementById("dia").value;

  if (!nome || !servico || !dia || !horarioSelecionado) {
    alert("Preencha todos os campos");
    return;
  }

  salvarAgendamento(dia, horarioSelecionado);
  enviarWhatsApp(nome, servico, dia, horarioSelecionado);
}

function salvarAgendamento(dia, horario) {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || {};

  if (!agendamentos[dia]) {
    agendamentos[dia] = [];
  }

  agendamentos[dia].push(horario);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

function enviarWhatsApp(nome, servico, dia, horario) {
  const telefone = "5512974122895"; // número da profissional
  const mensagem = `
Olá! Gostaria de confirmar meu agendamento 💖

Nome: ${nome}
Serviço: ${servico}
Data: ${dia}
Horário: ${horario}
`;

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

