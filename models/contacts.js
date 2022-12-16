const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "../models", "contacts.json");
const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try{
    const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
  catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try{
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
    }
    catch (error) {
      console.log(error);
    }
}

const removeContact = async (contactId) => {
  try{
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result; 
  }
  catch (error) {
    console.log(error);
  }
}

const addContact = async ({ name, email, phone }) => {
  try{
    const contacts = await listContacts();
    const newContacts = {
        id: uuidv4(),
        name, 
        email,
        phone,
    }

    contacts.push(newContacts);
    await updateContacts(contacts);

    return newContacts;
  }
    catch (error) {
      console.log(error);
    }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}