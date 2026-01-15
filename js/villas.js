const cardContainer = document.getElementById("card-container");

const capacityIcons = {
  guests: "fa-solid fa-users",
  bedrooms: "fa-solid fa-bed",
  bathrooms: "fa-solid fa-bath",
};

// build card elements but don't insert them directly into DOM yet
const cards = properties.map((property) => {
  const card = document.createElement("div");
  card.classList.add("property-card");

  const guestsIcon = capacityIcons.guests;
  const bedroomsIcon = capacityIcons.bedrooms;
  const bathroomsIcon = capacityIcons.bathrooms;

  const imgSrc = Array.isArray(property.gallery)
    ? property.gallery[0]
    : property.gallery || "";

  card.innerHTML = `
    <div class="img-container">
      <img src="${imgSrc}" alt=""/>
      <div class="pricetag">${property.priceTag}</div>
    </div>

    <div class="card-contents">
      <div class="location-title">
        <div class="location">
          <p>${property.location.country}</p>
          <div class="dot"></div>
          <p>${property.location.area}</p>
        </div>
        <h2>${property.title}</h2>
      </div>

      <div class="capacity">
        <div><i class="${guestsIcon}"></i> ${property.capacity.guests} guests</div>
        <div><i class="${bedroomsIcon}"></i> ${property.capacity.bedrooms} bedrooms</div>
        <div><i class="${bathroomsIcon}"></i> ${property.capacity.bathrooms} bathrooms</div>
        <div></div>
      </div>
    </div>
  `;

  return card;
});

// Desktop (and tablet) default rendering: grid of cards
function renderGrid() {
  cardContainer.innerHTML = "";
  cards.forEach((c) => cardContainer.appendChild(c));
}

// Mobile slider state
let mobileActive = false;
let track = null;
let prevBtn = null;
let nextBtn = null;
let currentIndex = 0;

function enableMobileSlider() {
  if (mobileActive) return;

  // create track and slides (3 cards per slide)
  track = document.createElement("div");
  track.className = "carousel-track";

  for (let i = 0; i < cards.length; i += 3) {
    const slide = document.createElement("div");
    slide.className = "slide";
    for (let j = 0; j < 3 && i + j < cards.length; j++) {
      slide.appendChild(cards[i + j]);
    }
    track.appendChild(slide);
  }

  cardContainer.innerHTML = "";
  cardContainer.appendChild(track);

  // create mobile-only nav buttons
  prevBtn = document.createElement("button");
  prevBtn.className = "mobile-carousel-btn prev";
  prevBtn.setAttribute("aria-label", "Previous");
  prevBtn.textContent = "‹";

  nextBtn = document.createElement("button");
  nextBtn.className = "mobile-carousel-btn next";
  nextBtn.setAttribute("aria-label", "Next");
  nextBtn.textContent = "›";

  // append buttons to the parent of cardContainer so they overlay nicely
  const parent = cardContainer.parentElement;
  parent.appendChild(prevBtn);
  parent.appendChild(nextBtn);

  prevBtn.addEventListener("click", () => slideTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => slideTo(currentIndex + 1));

  currentIndex = 0;
  updateButtons();
  mobileActive = true;
}

function disableMobileSlider() {
  if (!mobileActive) return;

  // move cards back into grid
  cardContainer.innerHTML = "";
  cards.forEach((c) => cardContainer.appendChild(c));

  // remove buttons
  if (prevBtn) prevBtn.remove();
  if (nextBtn) nextBtn.remove();

  track = null;
  prevBtn = null;
  nextBtn = null;
  currentIndex = 0;
  mobileActive = false;
}

function slideTo(index) {
  if (!track) return;
  const slides = track.children;
  const maxIndex = Math.max(0, slides.length - 1);
  currentIndex = Math.max(0, Math.min(index, maxIndex));

  const firstSlide = slides[0];
  if (!firstSlide) return;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const slideWidth = firstSlide.getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;

  updateButtons();
}

function updateButtons() {
  if (!prevBtn || !nextBtn || !track) return;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= Math.max(0, track.children.length - 1);
  if (track.children.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "";
    nextBtn.style.display = "";
  }
}

function handleResize() {
  const isMobile = window.innerWidth <= 600;
  if (isMobile) {
    enableMobileSlider();
  } else {
    disableMobileSlider();
  }
}

window.addEventListener("resize", handleResize);

// initial setup
renderGrid();
handleResize();

// existing navbar toggle
const navLists = document.getElementById("nav-lists");
const faBars = document.getElementById("fa-bars");
const showAndHideNavbarItem = () => {
  navLists.classList.toggle("show");
};

faBars.addEventListener("click", showAndHideNavbarItem);
