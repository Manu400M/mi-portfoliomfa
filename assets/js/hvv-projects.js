// Shared enhancement for the HVV galleries. Without JS all images remain visible.
(() => {
  const gallery = document.querySelector('.project-gallery');
  const dialog = document.querySelector('.image-dialog');
  if (!gallery || !dialog) return;

  const tabs = [...gallery.querySelectorAll('.gallery-tabs button')];
  const panels = [...gallery.querySelectorAll('.gallery-panel')];
  const tabList = gallery.querySelector('.gallery-tabs');
  tabList.setAttribute('role', 'tablist');
  gallery.classList.add('enhanced');

  function selectTab(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(next, true);
      }
    });
  });
  selectTab(0);

  const fullImage = dialog.querySelector('.dialog-image');
  const caption = dialog.querySelector('.dialog-caption');
  const count = dialog.querySelector('.dialog-count');
  const previous = dialog.querySelector('.dialog-prev');
  const next = dialog.querySelector('.dialog-next');
  let images = [];
  let current = 0;

  function showImage(index) {
    current = (index + images.length) % images.length;
    fullImage.src = images[current].src;
    fullImage.alt = images[current].alt;
    caption.textContent = fullImage.alt;
    count.textContent = `${current + 1} / ${images.length}`;
    previous.disabled = next.disabled = images.length < 2;
  }

  gallery.querySelectorAll('.gallery-image').forEach((button) => {
    button.addEventListener('click', () => {
      images = [...button.closest('.gallery-panel').querySelectorAll('img')];
      showImage(images.indexOf(button.querySelector('img')));
      dialog.showModal();
      document.documentElement.classList.add('image-open');
    });
  });
  previous.addEventListener('click', () => showImage(current - 1));
  next.addEventListener('click', () => showImage(current + 1));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.documentElement.classList.remove('image-open'));
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
})();
