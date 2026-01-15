const cardContainer = document.getElementById("card-container");

const capacityIcons = {
  guests: "fa-solid fa-users",
  bedrooms: "fa-solid fa-bed",
  bathrooms: "fa-solid fa-bath",
};

if (cardContainer && Array.isArray(properties)) {
  // ensure there's a track inside cardContainer
  let track = cardContainer.querySelector(".carousel-track");
  if (!track) {
    track = document.createElement("div");
    track.className = "carousel-track";
    cardContainer.appendChild(track);
  }

  properties.forEach((property) => {
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

    track.appendChild(card);
  });

  // carousel controls
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let totalCards = track.children.length;
  let visibleCount = getVisibleCount();
  let currentIndex = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= Math.max(0, totalCards - visibleCount);
    // hide if not needed
    if (totalCards <= visibleCount) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "";
      nextBtn.style.display = "";
    }
  }

  function updateLayout() {
    visibleCount = getVisibleCount();
    totalCards = track.children.length;
    // ensure currentIndex valid
    if (currentIndex > Math.max(0, totalCards - visibleCount)) {
      currentIndex = Math.max(0, totalCards - visibleCount);
    }
    slideTo(currentIndex);
    updateButtons();
  }

  function slideTo(index) {
    currentIndex = Math.max(
      0,
      Math.min(index, Math.max(0, totalCards - visibleCount))
    );
    const firstCard = track.querySelector(".property-card");
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    track.style.transform = `translateX(-${
      currentIndex * (cardWidth + gap)
    }px)`;
    updateButtons();
  }

  if (prevBtn)
    prevBtn.addEventListener("click", () => slideTo(currentIndex - 1));
  if (nextBtn)
    nextBtn.addEventListener("click", () => slideTo(currentIndex + 1));

  window.addEventListener("resize", () => {
    updateLayout();
  });

  // init
  updateLayout();
} else {
  console.warn("home-page: missing card container or properties data");
}

const navLists = document.getElementById("nav-lists");
const faBars = document.getElementById("fa-bars");
const showAndHideNavbarItem = () => {
  // contain
  // add
  // toggle
  navLists.classList.toggle("show");
};

faBars.addEventListener("click", showAndHideNavbarItem);
