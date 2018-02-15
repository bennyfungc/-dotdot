if (localStorage.getItem('isLogin') == 'true') {
  let username = document.getElementById('display-name');
  username.innerHTML = "Welcome, " + localStorage.getItem('login-username');
}
else
  window.location.href = "./login.html";
