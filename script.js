// Datos de ramos con dependencias
const courses = {
  // === PRIMER AÑO ===
  "Química General": ["Bioquímica", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Biología Celular": ["Histología", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Zoología": ["Parasitología", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Inglés I": ["Inglés II", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Ecología": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Rol del Médico Veterinario": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Bioquímica": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Histología": ["Embriología", "Patología General", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Anatomía Animal I": ["Anatomía Animal II", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Zootecnia": ["Nutrición y Alimentación", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Etología y Bienestar Animal": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Electivo Antropológico Cristiano": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  // === SEGUNDO AÑO ===
  "Fisiología Animal I": ["Fisiología Animal II", "Fisiopatología I", "Farmacología", "Evaluación de Ciclo Inicial", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Embriología": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Anatomía Animal II": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Microbiología General": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Reproducción y Genética": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Inglés II": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Electivo Diversidad I": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Fisiología Animal II": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Patología General": ["Evaluación de Ciclo Inicial", "Semiotecnia", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Nutrición y Alimentación": ["Producción de Aves y Cerdos", "Producción de Rumiantes Menores", "Producción Bovina", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Epidemiología": ["Evaluación de Ciclo Inicial", "Vigilancia Epidemiológica", "Gestión Ambiental", "Tecnología de Alimentos e Inocuidad", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  "Contexto Social": ["Negocios y Emprendimiento", "Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II", "Desarrollo Rural"],
  "Parasitología": ["Evaluación de Ciclo Inicial", "Metodología de Investigación", "Electivo Disciplinar I", "Electivo Disciplinar II"],
  // ... Sigue agregando todos los cursos y dependencias que falten
};

// Crear estructura de dependencias inversa
const unlockMap = {};
Object.entries(courses).forEach(([course, unlocks]) => {
  unlocks.forEach(dep => {
    if (!unlockMap[dep]) unlockMap[dep] = [];
    unlockMap[dep].push(course);
  });
});

const allCourses = Array.from(new Set([
  ...Object.keys(courses),
  ...Object.values(courses).flat()
]));

const courseElements = {};

// Crear elementos
const grid = document.getElementById('grid');
allCourses.forEach(course => {
  const div = document.createElement('div');
  div.textContent = course;
  div.classList.add('course');

  // Si tiene requisitos inversos, es locked inicialmente
  if (unlockMap[course]) {
    div.classList.add('locked');
  }

  div.addEventListener('click', () => {
    if (div.classList.contains('locked')) return;
    if (div.classList.contains('completed')) return;

    div.classList.add('completed');

    // Desbloquear dependientes
    if (courses[course]) {
      courses[course].forEach(dep => {
        const el = courseElements[dep];
        if (el) el.classList.remove('locked');
      });
    }
  });

  courseElements[course] = div;
  grid.appendChild(div);
});
