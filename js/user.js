var userName = document.getElementById('user');
var userUsername = document.getElementById('username');
var userEmail = document.getElementById('email');
var userPhone = document.getElementById('phone');

getUserData('https://jsonplaceholder.typicode.com/users');

function getUserData(url) {
    fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
       showUser(data);
        console.log(data);
    }).catch(function (error) {
         console.log(error);
    })
};

function showUser(data) {
    var user = {
        name: '',
        username: '',
        email: '',
        phone: ''
    }
    user.name = data[Math.floor(Math.random() * 10)].name;
    user.username = data[Math.floor(Math.random() * 10)].username;
    user.email = data[Math.floor(Math.random() * 10)].email;
    user.phone = data[Math.floor(Math.random() * 10)].phone;
    userName.innerHTML = user.name;
    userUsername.innerHTML = user.username;
    userEmail.innerHTML = user.email;
    userPhone.innerHTML = user.phone.substring(0,13);
}