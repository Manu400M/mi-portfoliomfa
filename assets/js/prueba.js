document.addEventListener('DOMContentLoaded', () => {

    // Selecciona todos los contenedores de carrusel en la página
    const carousels = document.querySelectorAll('.carousel-container');

    // Itera sobre cada carrusel para inicializarlo de forma independiente
    carousels.forEach(container => {
        const images = container.querySelectorAll('.carousel img');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');
        
        // Si no hay imágenes o solo hay una, no hacemos nada
        if (images.length <= 1) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            return;
        }

        let currentIndex = 0;

        /**
         * Muestra la imagen en el nuevo índice.
         * Esta función ahora es más simple y directa.
         * @param {number} newIndex - El índice de la imagen que queremos mostrar.
         */
        function showImage(newIndex) {
            // 1. Oculta la imagen que está actualmente visible
            images[currentIndex].classList.remove('active');

            // 2. Calcula el nuevo índice asegurando que sea cíclico (si llega al final, vuelve al inicio)
            currentIndex = (newIndex + images.length) % images.length;

            // 3. Muestra la nueva imagen
            images[currentIndex].classList.add('active');
        }

        // Event listener para el botón "siguiente"
        nextButton.addEventListener('click', () => {
            showImage(currentIndex + 1);
        });

        // Event listener para el botón "anterior"
        prevButton.addEventListener('click', () => {
            showImage(currentIndex - 1);
        });

        // Asegura que solo la primera imagen tenga la clase 'active' al inicio
        images.forEach((img, index) => {
            if (index === 0) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    });
});


// Modo enfoque para carruseles
const focusOverlay = document.getElementById('carouselFocus');
const focusContent = focusOverlay.querySelector('.focus-content');
const closeFocusBtn = document.getElementById('closeFocus');

// Abrir carrusel en modo enfoque
document.querySelectorAll('.carousel-container').forEach(container => {
  container.addEventListener('click', (e) => {
    // Evitar que los clicks en botones cambien el foco
    if (e.target.classList.contains('prev') || e.target.classList.contains('next')) return;

    // Clonar el carrusel y meterlo en el overlay
    const clone = container.cloneNode(true);
    focusContent.innerHTML = ''; // limpiar antes
    focusContent.appendChild(clone);

    // Activar overlay
    focusOverlay.classList.add('active');

    // ⚠️ Volver a enlazar la funcionalidad de botones para el clon
    const images = clone.querySelectorAll('.carousel img');
    const prevButton = clone.querySelector('.prev');
    const nextButton = clone.querySelector('.next');
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));

    function showImage(newIndex) {
      images[currentIndex].classList.remove('active');
      currentIndex = (newIndex + images.length) % images.length;
      images[currentIndex].classList.add('active');
    }

    nextButton.addEventListener('click', () => showImage(currentIndex + 1));
    prevButton.addEventListener('click', () => showImage(currentIndex - 1));
  });
});

// Cerrar enfoque
closeFocusBtn.addEventListener('click', () => {
  focusOverlay.classList.remove('active');
});
focusOverlay.addEventListener('click', (e) => {
  if (e.target === focusOverlay) {
    focusOverlay.classList.remove('active');
  }
});
