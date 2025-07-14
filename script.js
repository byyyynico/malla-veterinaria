const ramos = [
  {
    semestre: "I Semestre",
    nombre: "Química General",
    abre: ["Bioquímica", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"]
  },
  {
    semestre: "I Semestre",
    nombre: "Biología Celular",
    abre: ["Histología", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"]
  },
  {
    semestre: "I Semestre",
    nombre: "Zoología",
    abre: ["Parasitología", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"]
  },
  {
    semestre: "I Semestre",
    nombre: "Inglés I",
    abre: ["Inglés II", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"]
  },
  {
    semestre: "I Semestre",
    nombre: "Ecología",
    abre: ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"]
  },
  {
    semestre: "I Semestre",
    nombre: "Rol del Médico Veterinario",
    abre: ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"]
  }
  // Continúa agregando aquí el resto de los ramos con mismo formato
];

const malla = document.querySelector('.malla');

function crearRamo(ramo) {
  const div = document.createElement('div');
  div.className = 'ramo';
  div.textContent = ramo.nombre;
  div.dataset.nombre = ramo.nombre;
  if (ramo.abre) div.dataset.abre = JSON.stringify(ramo.abre);
  div.classList.add('bloqueado');

  div.addEventListener('click', () => {
    if (div.classList.contains('bloqueado')) return;
    div.classList.toggle('aprobado');
    const desbloquear = JSON.parse(div.dataset.abre || '[]');
    desbloquear.forEach(nombre => desbloquearRamo(nombre));
  });

  return div;
}

function desbloquearRamo(nombre) {
  const ramosDOM = document.querySelectorAll('.ramo');
  ramosDOM.forEach(r => {
    if (r.dataset.nombre === nombre) {
      r.classList.remove('bloqueado');
    }
  });
}

function agruparPorSemestre(lista) {
  const grupos = {};
  lista.forEach(r => {
    if (!grupos[r.semestre]) grupos[r.semestre] = [];
    grupos[r.semestre].push(r);
  });
  return grupos;
}

const grupos = agruparPorSemestre(ramos);

for (const [semestre, listaRamos] of Object.entries(grupos)) {
  const semestreDiv = document.createElement('div');
  semestreDiv.className = 'semestre';
  const h2 = document.createElement('h2');
  h2.textContent = semestre;
  semestreDiv.appendChild(h2);
  listaRamos.forEach(ramo => {
    const el = crearRamo(ramo);
    if (!ramo.abre || ramo.abre.length === 0) el.classList.remove('bloqueado');
    semestreDiv.appendChild(el);
  });
  malla.appendChild(semestreDiv);
}
