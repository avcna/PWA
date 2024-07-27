import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgrkPRvMrJIqUVdKtyMiHbYRzBReS_DdE",
  authDomain: "pwa-project-4d4d3.firebaseapp.com",
  projectId: "pwa-project-4d4d3",
  storageBucket: "pwa-project-4d4d3.appspot.com",
  messagingSenderId: "277942929475",
  appId: "1:277942929475:web:804902248d4c33a5b96cf6",
  measurementId: "G-R43M47WW07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Enable persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Persistence failed: Multiple tabs open.");
  } else if (err.code === "unimplemented") {
    console.log("Persistence is not supported by this browser.");
  }
});

// Real-time listener
const contactsCol = collection(db, "contacts");
onSnapshot(contactsCol, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderContact(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeContact(change.doc.id);
    }
  });
});

// Add new contact
const form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const contact = {
    name: form.title.value,
    number: form.numbers.value,
  };

  addDoc(contactsCol, contact)
    .then(() => {
      form.title.value = "";
      form.numbers.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a contact
const contactContainer = document.querySelector(".contacts");
contactContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    deleteDoc(doc(db, "contacts", id));
  }
});
