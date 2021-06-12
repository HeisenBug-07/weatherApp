const search = document.querySelector(".place");
const form = document.querySelector("form");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");
msg1.classList.remove("error");
msg2.classList.remove("success");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg1.textContent = "loading...";
  msg2.textContent = "";
  const location = search.value;
  //fetching data
  fetch(`http://localhost:3000/weather?search=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.classList.add("error");
        msg1.textContent = data.error;
      } else {
        msg1.classList.remove("error");
        msg2.classList.add("success");
        msg1.textContent = `${data.location}`;
        msg2.textContent = `${data.temperature}\u00B0C, ${data.description}`;
      }
    });
  });
});
