const slider = tns({
  container: '.slider-content',
  prevButton: '.arrow-left',
  nextButton: '.arrow-right',
  items: 1,
  nav: false,
  center: true,
});

// portfolio interaction
const portfolio = document.querySelector('.portfolio');
const pictures = document.querySelectorAll('.portfolio-image');
const tags = document.querySelectorAll('.tag');

tags.forEach((tag) =>
  tag.addEventListener('click', () => {
    tags.forEach((t) => t.classList.remove('tag-active'));
    tag.classList.add('tag-active');
    shufflePortfolio();
  })
);

function shufflePortfolio() {
  const newPictures = Array.from(pictures).sort(() => Math.random() - 0.5);
  portfolio.innerHTML = '';
  newPictures.forEach((picture) => portfolio.appendChild(picture));
}

// add menu for mobile view
const headerIcon = document.getElementById('menu');
const menu = document.querySelector('.aside-overlay');

headerIcon.addEventListener('click', toggleAside);
menu.addEventListener('click', (ev) => {
  if (['ASIDE'].includes(ev.target.tagName)) return;
  toggleAside();
});

function toggleAside() {
  if (menu.classList.contains('aside-overlay-visible')) {
    menu.classList.remove('aside-overlay-visible');
  } else {
    menu.classList.add('aside-overlay-visible');
  }
}

// add header & menu active items
const anchors = document.querySelectorAll('.hidden-anchor[id]');

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

document.addEventListener('scroll', debounce(lookForAnchor, 100));

function lookForAnchor() {
  const currentAnchor = Array.from(anchors).find((a) => a.getBoundingClientRect().y >= 0);

  if (currentAnchor) {
    const { id } = currentAnchor;
    [].forEach.call(document.links, (link) => link.classList.remove('active'));
    const links = document.querySelectorAll(`a[href$='#${id}'`);
    links.forEach((link) => link.classList.add('active'));
  }
}
