async function loadMenu() {
  const response = await fetch('/.netlify/functions/menu');
  const dishes = await response.json();

  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  dishes.forEach(dish => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <img src="${dish.image_url}" alt="${dish.name}">
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <span>₹${dish.price}</span>
    `;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();

  // Contact form
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm));
    await fetch('/.netlify/functions/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    alert('Message sent!');
    contactForm.reset();
  });

  // Reservation form
  const resForm = document.getElementById('reservation-form');
  resForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(resForm));
    await fetch('/.netlify/functions/reservation', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    alert('Reservation submitted!');
    resForm.reset();
  });
});
