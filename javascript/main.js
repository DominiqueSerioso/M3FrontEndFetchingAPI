const contactList = document.querySelector('.contact-list');
let output = '';
const url = 'http://localhost:8000/api/contact';
const addContactForm = document.querySelector('.add-contact-form');
const nameValue = document.getElementById('name-value');
const phoneValue = document.getElementById('phone-value');
const emailValue = document.getElementById('email-value');
const btnSubmit = document.querySelector('.btn');

const renderContacts = (contact) => {
  contact.data.forEach(contacts => {
    output +=`
      <div class="card mt-4 col-md-6 bg-ligt">
        <div class="card-body" data-id=${contacts.id}>
          <h5 class="card-name">${contacts.name}</h5>
          <h6 class="card-phone mb-2 text-muted">${contacts.phone}</h6>
          <p class="card-email">${contacts.email}</p>
          <a href="#" class="card-link" id="edit-post">Edit</a>
          <a href="#" class="card-link" id="delete-post">Delete</a>
        </div>
      </div>
    `;
  })
  contactList.innerHTML = output;
}
// Get - Read data
// Method GET
fetch(url)
  .then(res => res.json())
  .then(data => renderContacts(data))

  contactList.addEventListener('click', (e) => {
      e.preventDefault();
      let delButtonIsPressed = e.target.id == 'delete-post';
      let editButtonIsPressed = e.target.id == 'edit-post';

      let id = e.target.parentElement.dataset.id;

      // Removing Contact Data
      //Method DELETE
      if(delButtonIsPressed)
      {
          fetch(`${url}/${id}`,{
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(() => location.reload()) 
      }

      if(editButtonIsPressed)
      {
        const parent = e.target.parentElement;
        let nameContent = parent.querySelector('.card-name').textContent;
        let phoneContent = parent.querySelector('.card-phone').textContent;
        let emailContent = parent.querySelector('.card-email').textContent;
        
        nameValue.value = nameContent;
        phoneValue.value = phoneContent;
        emailValue.value = emailContent;
      }

      //Updating Data
      //Method: PATCH
      btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`${url}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: nameValue.value,
            phone: phoneValue.value,
            email: emailValue.value, 
          })
        })
          .then(res => res.json())
          .then(() => location.reload())
      })

});
//Create - Insert new contact
//Method POST
addContactForm.addEventListener('submit',(e) => {
  e.preventDefault();

  console.log(nameValue.value);

  fetch(url, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue.value,
      phone: phoneValue.value,
      email: emailValue.value
    })
  })
    .then(res => res.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      renderContacts(dataArr);
    })
    .then(() => location.reload());

    //reset value
    nameValue.value = '';
    phoneValue.value = '';
    emailValue.value = '';
})