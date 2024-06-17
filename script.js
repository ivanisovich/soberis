document.addEventListener("DOMContentLoaded",()=>{
  
  fetch("/templates/footer.html")
    .then((response) => response.text())
    .then((templateHtml) => {
      document.body.insertAdjacentHTML("beforeend", templateHtml);

      var source = document.getElementById("footer-template").innerHTML;

      var template = Handlebars.compile(source);

      var context = {};

      var html = template(context);
      document.getElementById("footer-container").innerHTML = html;
    });

})

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  let currentColorIndex = 0;

  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;

    // Change the cursor color based on the position
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    cursor.style.backgroundColor = colors[currentColorIndex];
  });
});