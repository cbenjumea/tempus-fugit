// ============================
// FRASES MOTIVACIONALES
// ============================

const quotes = [
    {
        text: "Tu tiempo es limitado, no lo desperdicies viviendo la vida de alguien más.",
        author: "Steve Jobs"
    },
    {
        text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.",
        author: "John Lennon"
    },
    {
        text: "La única forma de hacer un gran trabajo es amar lo que haces.",
        author: "Steve Jobs"
    },
    {
        text: "No cuentes los días, haz que los días cuenten.",
        author: "Muhammad Ali"
    },
    {
        text: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "La imaginación es más importante que el conocimiento.",
        author: "Albert Einstein"
    },
    {
        text: "La vida es como montar en bicicleta. Para mantener el equilibrio, debes seguir adelante.",
        author: "Albert Einstein"
    },
    {
        text: "El éxito es ir de fracaso en fracaso sin perder el entusiasmo.",
        author: "Winston Churchill"
    },
    {
        text: "La mejor forma de predecir el futuro es crearlo.",
        author: "Peter Drucker"
    },
    {
        text: "El único modo de hacer un gran trabajo es amar lo que haces.",
        author: "Steve Jobs"
    },
    {
        text: "No esperes. Nunca habrá un momento perfecto.",
        author: "Napoleon Hill"
    },
    {
        text: "La vida es 10% lo que te sucede y 90% cómo reaccionas ante ello.",
        author: "Charles R. Swindoll"
    },
    {
        text: "El propósito de nuestras vidas es ser felices.",
        author: "Dalai Lama"
    },
    {
        text: "Vivir es nacer a cada instante.",
        author: "Erich Fromm"
    },
    {
        text: "El tiempo es más valioso que el dinero. Puedes obtener más dinero, pero no puedes obtener más tiempo.",
        author: "Jim Rohn"
    },
    {
        text: "No dejes que el ayer use demasiado del hoy.",
        author: "Will Rogers"
    },
    {
        text: "El secreto de salir adelante es comenzar.",
        author: "Mark Twain"
    },
    {
        text: "Los años te enseñan muchas cosas que los días nunca conocieron.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "La vida es realmente simple, pero insistimos en hacerla complicada.",
        author: "Confucio"
    },
    {
        text: "El tiempo es el más sabio de los consejeros.",
        author: "Plutarco"
    },
    {
        text: "Cada momento es una oportunidad para volver a empezar.",
        author: "Oprah Winfrey"
    },
    {
        text: "El tiempo vuela. Es tu responsabilidad ser el piloto.",
        author: "Michael Altshuler"
    },
    {
        text: "No hay nada permanente excepto el cambio.",
        author: "Heráclito"
    },
    {
        text: "La acción es la llave fundamental de todo éxito.",
        author: "Pablo Picasso"
    },
    {
        text: "El momento más importante es ahora.",
        author: "Buda"
    }
];

// ============================
// ELEMENTOS DEL DOM
// ============================

const yearPercentageEl = document.getElementById('yearPercentage');
const currentYearEl = document.getElementById('currentYear');
const currentDateEl = document.getElementById('currentDate');
const daysRemainingEl = document.getElementById('daysRemaining');
const progressBarEl = document.getElementById('progressBar');
const wakeBtnEl = document.getElementById('wakeBtn');
const quoteContainerEl = document.getElementById('quoteContainer');
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');
const bucketInputEl = document.getElementById('bucketInput');
const addBtnEl = document.getElementById('addBtn');
const bucketListEl = document.getElementById('bucketList');
const completedCountEl = document.getElementById('completedCount');
const totalCountEl = document.getElementById('totalCount');

// ============================
// FUNCIONES DE FECHA Y PROGRESO
// ============================

/**
 * Calcula el porcentaje del año transcurrido
 */
function calculateYearProgress() {
    const now = new Date();
    const year = now.getFullYear();

    // Inicio del año
    const startOfYear = new Date(year, 0, 1);

    // Fin del año
    const endOfYear = new Date(year + 1, 0, 1);

    // Tiempo transcurrido desde el inicio del año
    const elapsed = now - startOfYear;

    // Duración total del año
    const total = endOfYear - startOfYear;

    // Porcentaje
    const percentage = (elapsed / total) * 100;

    return {
        percentage: percentage,
        year: year,
        daysRemaining: Math.ceil((endOfYear - now) / (1000 * 60 * 60 * 24))
    };
}

/**
 * Actualiza la información del año en la UI
 */
function updateYearInfo() {
    const progress = calculateYearProgress();

    // Actualizar porcentaje
    yearPercentageEl.textContent = `${Math.floor(progress.percentage)}%`;

    // Actualizar año actual
    currentYearEl.textContent = progress.year;

    // Actualizar fecha actual
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    currentDateEl.textContent = now.toLocaleDateString('es-ES', options);

    // Actualizar días restantes
    daysRemainingEl.textContent = progress.daysRemaining;

    // Actualizar barra de progreso
    progressBarEl.style.width = `${progress.percentage}%`;
}

// ============================
// FUNCIONES DE FRASES MOTIVACIONALES
// ============================

/**
 * Obtiene una frase aleatoria
 */
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

/**
 * Muestra una frase motivacional
 */
function showQuote() {
    const quote = getRandomQuote();

    // Fade out
    quoteContainerEl.classList.remove('show');

    // Cambiar contenido después de la animación
    setTimeout(() => {
        quoteTextEl.textContent = `"${quote.text}"`;
        quoteAuthorEl.textContent = quote.author;

        // Fade in
        quoteContainerEl.classList.add('show');
    }, 300);
}

// ============================
// FUNCIONES DE BUCKET LIST
// ============================

/**
 * Carga los items del localStorage
 */
function loadBucketList() {
    const items = JSON.parse(localStorage.getItem('bucketList')) || [];
    bucketListEl.innerHTML = '';

    items.forEach((item, index) => {
        createBucketItem(item.text, item.completed, index);
    });

    updateCounter();
}

/**
 * Guarda los items en localStorage
 */
function saveBucketList() {
    const items = [];
    const listItems = bucketListEl.querySelectorAll('.bucket-item');

    listItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');

        items.push({
            text: label.textContent,
            completed: checkbox.checked
        });
    });

    localStorage.setItem('bucketList', JSON.stringify(items));
}

/**
 * Habilita la edición de un item
 */
function enableEditMode(li, label) {
    const currentText = label.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = currentText;
    editInput.maxLength = 100;

    // Reemplazar label con input
    li.replaceChild(editInput, label);
    editInput.focus();
    editInput.select();

    // Función para guardar cambios
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (newText !== '' && newText !== currentText) {
            label.textContent = newText;
        }
        li.replaceChild(label, editInput);
        saveBucketList();
    };

    // Función para cancelar edición
    const cancelEdit = () => {
        li.replaceChild(label, editInput);
    };

    // Event listeners para el input
    editInput.addEventListener('blur', saveEdit);
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    });
}

/**
 * Crea un elemento de la bucket list
 */
function createBucketItem(text, completed = false, index) {
    const li = document.createElement('li');
    li.className = 'bucket-item';
    if (completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.id = `item-${index}`;

    const label = document.createElement('label');
    label.textContent = text;
    label.setAttribute('for', `item-${index}`);

    // Botón de editar (lápiz)
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.title = 'Editar';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Eliminar';

    // Event listeners
    checkbox.addEventListener('change', () => {
        const wasCompleted = li.classList.contains('completed');

        if (checkbox.checked) {
            li.classList.add('completed');
            // Animación de celebración si se acaba de completar
            if (!wasCompleted) {
                li.classList.add('celebrate');
                setTimeout(() => li.classList.remove('celebrate'), 500);
            }
        } else {
            li.classList.remove('completed');
        }
        saveBucketList();
        updateCounter();
    });

    // Doble click en el label para editar
    label.addEventListener('dblclick', (e) => {
        e.preventDefault();
        enableEditMode(li, label);
    });

    // Click en botón de editar
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        enableEditMode(li, label);
    });

    deleteBtn.addEventListener('click', () => {
        li.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            li.remove();
            saveBucketList();
            updateCounter();
        }, 300);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    bucketListEl.appendChild(li);
}

/**
 * Añade un nuevo item a la bucket list
 */
function addBucketItem() {
    const text = bucketInputEl.value.trim();

    if (text === '') {
        bucketInputEl.focus();
        return;
    }

    const items = JSON.parse(localStorage.getItem('bucketList')) || [];
    const index = items.length;

    createBucketItem(text, false, index);
    saveBucketList();
    updateCounter();

    // Limpiar input y quitar clase expanded del botón
    bucketInputEl.value = '';
    addBtnEl.classList.remove('expanded');
    bucketInputEl.focus();
}

/**
 * Actualiza el contador de items completados
 */
function updateCounter() {
    const items = bucketListEl.querySelectorAll('.bucket-item');
    const completedItems = bucketListEl.querySelectorAll('.bucket-item.completed');

    totalCountEl.textContent = items.length;
    completedCountEl.textContent = completedItems.length;
}

// ============================
// EVENT LISTENERS
// ============================

// Botón Wake Me Up
wakeBtnEl.addEventListener('click', showQuote);

// Botón añadir item
addBtnEl.addEventListener('click', addBucketItem);

// Enter en el input
bucketInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBucketItem();
    }
});

// Mostrar/ocultar texto "Añadir" en el botón
bucketInputEl.addEventListener('input', () => {
    if (bucketInputEl.value.trim() !== '') {
        addBtnEl.classList.add('expanded');
    } else {
        addBtnEl.classList.remove('expanded');
    }
});

// ============================
// INICIALIZACIÓN
// ============================

/**
 * Inicializa la aplicación
 */
function init() {
    // Actualizar información del año
    updateYearInfo();

    // Actualizar cada minuto
    setInterval(updateYearInfo, 60000);

    // Cargar bucket list
    loadBucketList();

    // Mostrar primera frase automáticamente (opcional)
    // showQuote();
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
