class Database {
  // list of accounts
  constructor() {
    let db = localStorage.getItem('database');
    // Get data if database already there
    if (db) {
      this.accounts = JSON.parse(db);
    } else {
      this.accounts = {};
      this.updateDatabase();
    }
  }

  // updates this.accounts to localstorage
  updateDatabase() {
    localStorage.setItem('database', JSON.stringify(this.accounts));
  }

  // returns true if add succesful
  add(account) {
    // check if this user can be added
    if (this.accounts[account.username]) {
      console.log("Account " + account.username + " is taken");
      return false;
    }
    this.accounts[account.username] = account;
    this.updateDatabase();
    console.log("Account " + account.username + " added successfully");
    return true;
  }

  check(account) {
    if (this.accounts[account.username])
      return false;
    return true;
  }

}


class Account {
  constructor(username, password, email, type) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.type = type;
    this.images = [];
    this.money = 100;
  }

  check() {

  }

}


function submitRegistration() {
  let db = new Database();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let type = document.getElementById("checkbox").checked;

  if (type)
    type = "creator"
  else
    type = "user"

  let acc = new Account(username, password, email, type);
  let success = db.add(acc);

  if(!success)
    alert("Username: " + username + " is taken.");
  else
    window.location.href = "./login.html";
}

function submitLogin() {
  let db = new Database();
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  // check if user exist
  let valid = false;
  if (db.accounts[username])
    if (db.accounts[username].password == password)
      valid = true;

  if(!valid) {
    alert("Username or password is incorrect. Try again noob");
  } else {

    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('login-username', username);
    window.location.href = "./index.html";
  }
}

function logout() {
  localStorage.setItem('isLogin', 'false');
}
