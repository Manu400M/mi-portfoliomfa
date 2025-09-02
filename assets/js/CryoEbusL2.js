document.addEventListener('DOMContentLoaded', () => {
  console.log('▶ CryoEbusL2: inicializando carruseles y overlay');

  // Overlay
  const focusOverlay = document.getElementById('carouselFocus');
  const focusContent = focusOverlay ? focusOverlay.querySelector('.focus-content') : null;
  const closeFocusBtn = document.getElementById('closeFocus');

  if (!focusOverlay || !focusContent || !closeFocusBtn) {
    console.warn('⚠️ Elementos de overlay faltan en el DOM (carouselFocus / focus-content / closeFocus).');
  }

  // Inicializador reusable de un carrusel (original o clon)
  function initCarousel(container) {
    if (!container) return;
    const images = container.querySelectorAll('.carousel img');
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');

    if (!images || images.length === 0) return;

    // Índice actual (busca .active)
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;

    // Asegura que solo una tenga active
    images.forEach((img, i) => img.classList.toggle('active', i === currentIndex));

    function showImage(newIndex) {
      images[currentIndex].classList.remove('active');
      currentIndex = (newIndex + images.length) % images.length;
      images[currentIndex].classList.add('active');
    }

    // Prev/next con stopPropagation para que no burbujeen
    if (next) {
      next.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
      });
    }
    if (prev) {
      prev.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
      });
    }
  }

  // Inicializa todos los carruseles existentes
  const containers = document.querySelectorAll('.carousel-container');
  containers.forEach(container => {
    initCarousel(container);

    // Añadimos click a cada imagen para abrir overlay (modo enfoque)
    container.querySelectorAll('.carousel img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openFocus(container);
      });
    });
  });

  // Abre el overlay clonando el contenedor
  function openFocus(container) {
    if (!focusOverlay || !focusContent) {
      console.warn('Overlay no inicializado.');
      return;
    }
    console.log('✦ Abriendo enfoque para carrusel:', container);

    // Clonar (sin listeners) y añadir al overlay
    const clone = container.cloneNode(true);
    focusContent.innerHTML = '';
    focusContent.appendChild(clone);

    // Mostrar overlay y bloquear scroll de fondo
    focusOverlay.classList.add('active');
    focusOverlay.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Inicializa carrusel dentro del clon (añade listeners a sus botones)
    initCarousel(clone);
  }

  // Cerrar overlay
  function closeFocus() {
    if (!focusOverlay || !focusContent) return;
    focusOverlay.classList.remove('active');
    focusOverlay.setAttribute('aria-hidden', 'true');
    focusContent.innerHTML = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    console.log('✕ Overlay cerrado');
  }

  // Eventos de cierre
  closeFocusBtn && closeFocusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeFocus();
  });

  focusOverlay && focusOverlay.addEventListener('click', (e) => {
    if (e.target === focusOverlay) closeFocus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFocus();
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('main-image');
    const loadingMessage = document.getElementById('loading-message');

    if (image && loadingMessage) {
        // Extraer solo el nombre del archivo de la ruta
        const imageName = image.src.split('/').pop();
        
        // 1. Mostrar el mensaje de carga inicial
        loadingMessage.textContent = `Cargando: ${imageName}...`;

        // 2. Cuando la imagen se carga correctamente
        image.onload = () => {
            console.log('✅ Imagen cargada correctamente.');
            loadingMessage.style.display = 'none'; // Ocultar el mensaje
            image.style.opacity = '1'; // Mostrar la imagen
        };

        // 3. (Opcional) Si la imagen falla al cargar
        image.onerror = () => {
            console.error('❌ Error al cargar la imagen.');
            loadingMessage.textContent = `Error al cargar: ${imageName}`;
            loadingMessage.style.color = 'red';
        };
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para el vídeo ---
    const video = document.getElementById('main-video');
    const videoLoadingMessage = document.getElementById('video-loading-message');

    if (video && videoLoadingMessage) {
        // Extraer solo el nombre del archivo de la ruta
        const videoName = video.src.split('/').pop();
        
        // 1. Mostrar el mensaje de carga inicial
        videoLoadingMessage.textContent = `Cargando vídeo: ${videoName}...`;

        // 2. Cuando el vídeo tenga suficientes datos para reproducirse entero
        video.addEventListener('canplaythrough', () => {
            console.log('✅ Vídeo listo para reproducir.');
            videoLoadingMessage.style.display = 'none'; // Ocultar el mensaje
            video.style.opacity = '1'; // Mostrar el vídeo
        });

        // 3. (Opcional) Si el vídeo falla al cargar
        video.addEventListener('error', () => {
            console.error('❌ Error al cargar el vídeo.');
            videoLoadingMessage.textContent = `Error al cargar el vídeo: ${videoName}`;
            videoLoadingMessage.style.color = 'red';
        });
    }

    // --- (Aquí puedes mantener la lógica para la imagen si está en la misma página) ---

});