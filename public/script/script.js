var date = new Date();
document.getElementById("date").innerText = date.getFullYear();

var image = document.getElementsByTagName("img");

for (let i = 0; i < image.length; i++) {
  image[i].setAttribute("draggable", "false");
}

document.addEventListener("copy", (event) => {
  event.preventDefault();
  console.log(event);
});

document.addEventListener("paste", (event) => {
  event.preventDefault();
  console.log(event);
});
