/*
 * Database is a dictionary of user accounts
 * where the key is the username
 * and the value is a user object
 */
class Database {

  constructor() {
    let db = localStorage.getItem('database');

    // Get data if database already there
    if (db) {
      this.accounts = JSON.parse(db);
    } else {  // initialize database
      this.accounts = {};
      this.updateDatabase();
    }
  }

  // updates this.accounts dictionary to localstorage
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

  transaction(sender, receiver, amount) {
      if(this.accounts[sender].money - amount > 0) {
        this.accounts[sender].money -= amount;
        this.accounts[receiver].money += amount;
        this.updateDatabase();
        return true;
      }
      else {
        return false;
      }
  }
}

/*
 * Account is a user object
 * Each user object has a username, password, email, type, images, money
 * where type can be 'creator' or 'user'
 * where images is a list of images the creator uploaded
 * where money is the currency used in our app
 */
class Account {

  constructor(username, password, email, type) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.type = type;
    this.images = [];
    this.money = 100;
  }

}


/***  Functions  ***/

/*
 *  This function is called when the submit button is clicked
 *  in the registration page.
 *
 *  It saves the registration info from the user and creates a
 *  user object from that info.
 *
 *  If a username is already taken, an error would be thrown.
 */
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




/*
 *  This function is called when the login button is clicked
 *  in the login page.
 *
 *  It logins the user if the account is in the database and
 *  sets a variable in localStorage 'isLogin' to be 'true' and
 *  sets a variable in localStorage 'login-username' to be the user's username
 *
 *  If login info is incorrect, then an error would be thrown.
 */
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
