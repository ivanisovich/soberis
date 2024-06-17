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
