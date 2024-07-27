const contact = document.querySelector(".contacts");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "left" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "right" });
});

const renderContact = (data, id) => {
  const html = `<div class="grey-text text-darken-1 pk-contact">
    <div class="contact-image">
      <img src="img/pkcontacts.png" alt="contact thumbnail">
    </div>
    <div class="contact-details">
      <div class="contact-title">${data.name}</div>
      <div class="contact-numbers">${data.number}</div>
    </div>
    <div class="contact-options">
      <i class="material-icons">call</i>
      <i class="material-icons delete-icon" data-id="${id}">delete_outline</i>
    </div>
  </div>`;

  contact.innerHTML += html;
};

const removeContact = (id) => {};
