const liste = document.querySelector("ul")
console.log(liste)
var listeItems = document.getElementsByTagName("li")

var element

var eltStored

var length

let todos = [];

var isNotify = false

const notificationBtn = document.getElementById("enable")

//---------------------add a new list item--------------------------------------/

const form = document.getElementById("form")
console.log(form)
form.addEventListener('submit'  , function(e){ //on écoute l'evènement 'click' sur le bouton pour ajouter une nouvelle listItems 
 
  const input = document.querySelector(".containerField form input").value //on recupère la valeur(value) de <input> la variable "input"
  if(input === ""){ 
    alert('You must enter one to-do !')
  }
  addTodo(input);
  
  notification()

  e.stopPropagation()
  e.preventDefault()
})


//-------------click on the button to hide the current to-do----------/
    var close = document.getElementsByClassName("close");
    var i;
  
liste.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
       toggle(event.target.parentElement.getAttribute('data-key'));
  }
  // check if that is a delete-button
  if (event.target.classList.contains('close')) {
     // get id from data-key attribute's value of parent <li> where the delete-button is present
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }});


//-------------click on the button to hide all the current to-do at the same time----------/
const closed = document.querySelector(".footer button")
 closed.addEventListener('click' , function(){
   liste.innerHTML = ''
   todos = []
   addToLocalStorage(todos)
   document.getElementById("to-do").innerHTML = 0
 })


//--------------------***************************----------------------------------*******/////
var t1 = document.querySelector('input[type="datetime-local"]')
function addTodo(item){
  // var t1 = document.querySelector('input[type="datetime-local"]')
  if(item !== ""){
    const todo = {
      id : Date.now(),
      name : item,
      time_end : new Date(t1.value)
    };
    todos.push(todo)
    addToLocalStorage(todos);
    form = " "
    document.getElementById("to-do").innerHTML = todos.length
  }
}

function renderTodos(todos){
  liste.innerHTML = '';
  todos.forEach(function(item){
    const element = document.createElement("li")
    element.setAttribute('data-key' , item.id)
    element.innerHTML = `<input type="radio" /> ${item.name}  <button class="close">X</button>  `
    liste.appendChild(element)
  });
}

function addToLocalStorage(todos){
  localStorage.setItem('todos' , JSON.stringify(todos));
  renderTodos(todos);
  
}

function getFromLocalStorage(){
  const reference = localStorage.getItem('todos')
  if(reference){
    todos = JSON.parse(reference)
    renderTodos(todos);
    document.getElementById("to-do").innerHTML = todos.length
    
  }
}

function notification(){
  todos.forEach(function(item){
    let now = new Date()
    const task = item.name
    const end_time = item.time_end
    const ending = new Date(end_time)
    console.log(now)
    console.log(ending)
    
    if(now.getHours() == ending.getHours() && now.getMinutes() == ending.getMinutes() && now.getSeconds() == "00"){
    //  item.name.classList.add("notifs")
    //   alert(item.name)
      
      if (Notification.permission !== 'granted')
       Notification.requestPermission();
      else {
       var notification = new Notification(task, {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: 'Hey there! You\'ve been notified!',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
       });
       notification.onclick = function() {
        window.open('http://stackoverflow.com/a/13328397/1269037');
       };
       localStorage.setItem('boolean', 'true')
       isNotify = localStorage.getItem('boolean')
      }
      // style()
    }

  })
}


function deleteTodo(id){
  todos = todos.filter(function(item){
    return item.id != id;
  });
  addToLocalStorage(todos);
  document.getElementById("to-do").innerHTML = todos.length
}



 /********************************************************************** */
 
  // On affiche ou non le bouton en fonction de la réponse
  if(Notification.permission === 'denied' || Notification.permission === 'default') {
    notificationBtn.style.display = 'block';
  } else {
    notificationBtn.style.display = 'none';
  }

function askNotificationPermission() {
  // La fonction qui sert effectivement à demander la permission

  // Vérifions si le navigateur prend en charge les notifications
  if (!('Notification' in window)) {
    console.log("Ce navigateur ne prend pas en charge les notifications.");
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission()
      } else {
      Notification.requestPermission();
    }
  }
 }
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }

  return true;
}
notificationBtn.addEventListener('click', askNotificationPermission)
setInterval("notification()", 1000)
getFromLocalStorage();

  