const servicesDiv = document.getElementById("services");
const message = document.getElementById("message");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const statusFilter = document.getElementById("statusFilter");
function showLoading() {
    servicesDiv.innerHTML = "";
    message.innerHTML = `<div class="loader"></div>`;
}
function displayServices(list) {
    servicesDiv.innerHTML = "";
    message.innerHTML = "";

    if (list.length === 0) {
        message.innerHTML = "<p class='empty'>No services found 😔</p>";
        return;
    }

    list.forEach(service => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <div class="image-box">
        <img src="${service.image || 'https://via.placeholder.com/300x180'}">
      </div>
      <div class="card-body">
        <span class="tag ${service.category.toLowerCase()}">${service.category}</span>
        <h3>${service.name}</h3>
        <p class="sub">${service.subCategory}</p>
        <p class="price">₹${service.price}</p>
        <p class="status ${service.status.toLowerCase()}">${service.status}</p>
        <p class="rating">⭐ ${service.rating}</p>
        <p class="disclaimer">* Prices shown are demo prices for project only</p>

        <div class="actions">
          <button class="book">Book Now</button>
          <button class="contact">Contact</button>
        </div>
      </div>
    `;

        servicesDiv.appendChild(card);
    });
}

function filterServices() {
    showLoading();

    setTimeout(() => {
        const search = searchBox.value.toLowerCase();

        const filtered = services.filter(s =>
            (
                s.name.toLowerCase().includes(search) ||
                s.category.toLowerCase().includes(search) ||
                s.subCategory.toLowerCase().includes(search) ||
                s.location.toLowerCase().includes(search)
            ) &&
            (categoryFilter.value === "" || s.category === categoryFilter.value) &&
            (locationFilter.value === "" || s.location === locationFilter.value) &&
            (statusFilter.value === "" || s.status === statusFilter.value)
        );

        displayServices(filtered);
    }, 400);
}

searchBox.addEventListener("input", filterServices);
categoryFilter.addEventListener("change", filterServices);
locationFilter.addEventListener("change", filterServices);
statusFilter.addEventListener("change", filterServices);

showLoading();
setTimeout(() => displayServices(services), 400);
