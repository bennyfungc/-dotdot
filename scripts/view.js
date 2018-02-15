function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

imgName = getParameterByName('img');
imgPath = "../artwork/" + imgName;
document.getElementById('body-img').src = imgPath;

function commentSubmit() {
  inputContent = document.getElementById('comment').value;
  chatContainer = document.getElementById('chat-container');

  var newComment = document.createElement('div');
  newComment.setAttribute('class', 'chat-bubble');

  var img = document.createElement('img');
  img.setAttribute('class', 'comment_pic');
  img.setAttribute('alt', '');
  img.setAttribute('src', '../assets/anon.jpg');

  var profLink = document.createElement('a');
  var br = document.createElement('br');
  profLink.setAttribute('class', 'profile-link');
  profLink.setAttribute('href', '#');
  profLink.textContent = localStorage.getItem('login-username');

  var time = document.createElement('span');
  var date = new Date();
  time.setAttribute('class', 'time');
  time.textContent = date.toLocaleDateString() + " " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  var text = document.createElement('p');
  text.textContent = inputContent;

  newComment.appendChild(img);
  newComment.appendChild(profLink);
  newComment.appendChild(br);
  newComment.appendChild(time);
  newComment.appendChild(text);
  chatContainer.prepend(newComment);

}
