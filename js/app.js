const button = document.getElementById('btnStar');
const responseContainer = document.getElementById('container');

window.addEventListener('load', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  showPosition();
});

function handleError() {
  console.log('Se ha presentado un error');
}

function timeWeather() {
  const data = JSON.parse(this.responseText);
        response = data.response;
  console.log(response);
  /*const article = data.response.docs[1];
  const  title = article.headline.main;
  const  snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);*/
}
