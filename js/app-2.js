const cardContainer = document.getElementById("card-container");

const capacityIcons = {
  guests: "fa-solid fa-users",
  bedrooms: "fa-solid fa-bed",
  bathrooms: "fa-solid fa-bath",
};

properties.forEach((property) => {
  const card = document.createElement("div");
  card.classList.add("property-card");

  const guestsIcon = capacityIcons.guests;
  const bedroomsIcon = capacityIcons.bedrooms;
  const bathroomsIcon = capacityIcons.bathrooms;

  card.innerHTML = `
  <div class="img-container">
  <img src="${property.gallery}" alt=""/>
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
  cardContainer.appendChild(card);
});

const navLists = document.getElementById("nav-lists");
const faBars = document.getElementById("fa-bars");
const showAndHideNavbarItem = () => {
  // contain
  // add
  // toggle
  navLists.classList.toggle("show");
};

faBars.addEventListener("click", showAndHideNavbarItem);
