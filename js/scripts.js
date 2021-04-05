// business logic: address book
function AddressBook() {
  this.contacts = {}
  this.currentId = -1;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] === undefined) return false
  return this.contacts[id];
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

AddressBook.prototype.addContacts = function(newContacts) {
  for (newContact of newContacts) {
    this.addContact(newContact)
  }
}

// business logic: contact
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function(key, value) {
  // let keyAlreadyExisted = true
  // if (this[key] === undefined) keyAlreadyExisted = false
  this[key] = value // this is the only important part
  // return keyAlreadyExisted
}

// setup
let contact0 = new Contact("Jimmy", "John", "555-555-5555")
let contact1 = new Contact("Shmoo", "McShmoo", "555-555-3333")
let contact2 = new Contact("Jeremy", "Banka", "555-333-1111")
let contact3 = new Contact("Seth", "Medeiros", "555-333-1111")
let contact4 = new Contact("Shane", "Graff", "555-333-1111")

let addressBook0 = new AddressBook()
addressBook0.addContact(contact0)
addressBook0.addContacts([contact1, contact2, contact3, contact4])
contact0.update('firstName', 'James')
addressBook0.findContact(3).update('firstName', 'Jem')

// ui logic

function $printContacts() {
  $('ul').empty()
  const arrayOfContacts = Object.values(addressBook0.contacts)
  arrayOfContacts.forEach(contact => {
    const contactName = contact.fullName()
    const $list = $('<li/>')
    const $contact = $list.text(contactName)
    $('ul').append($contact)
  })
}
// function $printContacts() {
//   $('ul').empty()
//   const arrayOfContacts = Object.values(addressBook0.contacts)
//   for (let i = 0; i < arrayOfContacts.length; i++) {
//     const contact = arrayOfContacts[i]
//     const contactName = contact.fullName()
//     const $contact = $('<li/>').text(contactName)
//     $('ul').append($contact)
//   }
// }
$(() => {
  $printContacts()
  $("form#add-contact").submit(e => {
    e.preventDefault()
    const firstName = $("#first-name").val()
    const lastName = $("#last-name").val()
    const phoneNumber = $("#phone-number").val()
    const newContact = new Contact(firstName, lastName, phoneNumber)
    addressBook0.addContact(newContact);
    $printContacts()
  })
})