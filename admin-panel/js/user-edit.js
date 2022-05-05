
document.getElementById('btnUpdateProfile').addEventListener('click', updateProfile);
document.getElementById('updateProfileForm').addEventListener('submit', updateProfile);

     //POST NAME
function updateProfile(e){
e.preventDefault();
let id = document.getElementById('currentUserID').value;
let firstname = document.getElementById('firstName').value;
let lastname = document.getElementById('lastName').value;
let about = document.getElementById('About').value;
let position = document.getElementById('Position').value;
let address = document.getElementById('Address').value;
let contact = document.getElementById('Contact').value;
let email = document.getElementById('Email').value;
let twitter = document.getElementById('Twitter').value;
let facebook = document.getElementById('Facebook').value;
let instagram = document.getElementById('Instagram').value;
let linkedin = document.getElementById('Linkedin').value;

let params =  
"firstname="+firstname+
"&lastname="+lastname+
"&about="+about+
"&position="+position+
"&address="+address+
"&contact="+contact+
"&email="+email+
"&twitter="+twitter+
"&facebook="+facebook+
"&instagram="+instagram+
"&linkedin="+linkedin+
"&id="+id
;

const xhr = new XMLHttpRequest();

xhr.open('POST', '../controller/user-edit.php', true);

xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


xhr.onload = function(){
console.log(this.responseText);
}
console.log(params);
//send
xhr.send(params);
}