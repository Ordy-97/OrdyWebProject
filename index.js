const liste = document.querySelector("ul")
console.log(liste)
var listeItems = document.getElementsByTagName("li")

var element

var eltStored

var length
//length = localStorage.getItem('quantity')
let todos = [];

//---------------------add a new list item--------------------------------------/
const add = document.querySelector(".containerField button")
console.log(add)
add.addEventListener("click"  , function(e){ //on écoute l'evènement 'click' sur le bouton pour ajouter une nouvelle listItems 
 
  const input = document.querySelector(".containerField input").value //on recupère la valeur(value) de <input> la variable "input"
  if(input === ""){ 
    alert('You must enter one to-do !')
  }
  addTodo(input);

  e.stopPropagation()
  e.preventDefault()
  


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
    }
  });

  /*for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement; //on recupère le parent de l'element "close" qui est <li></li>
      liste.removeChild(div); // masque la valeur de <li></li> grace à l'attribut "style.display" // on supprime complètement avec removeChild()
     // console.log(listeItems)
        document.getElementById("to-do").innerHTML = listeItems.length
        //console.log(listeItems)
    } 
  }*/

})


//-------------click on the button to hide all the current to-do at the same time----------/
const closed = document.querySelector(".footer button")
closed.addEventListener('click' , function(){
  liste.innerHTML = ''
  localStorage.clear()
  document.getElementById("to-do").innerHTML = 0
})
/*function(){
  var i = 0;
  while(i < listeItems.length){
    liste.removeChild(listeItems[i])
  }(i++)
  document.getElementById("to-do").innerHTML = listeItems.length
  //console.log(listeItems)

}*/



//--------------------***************************----------------------------------*******/////

function addTodo(item){
  if(item !== ""){
    const todo = {
      id : Date.now(),
      name : item
    };
    todos.push(todo)
    addToLocalStorage(todos);
    document.querySelector(".containerField input").value = "";
    document.getElementById("to-do").innerHTML = todos.length
  }
}

function renderTodos(todos){
  liste.innerHTML = '';
  todos.forEach(function(item){
    const element = document.createElement("li")
    element.setAttribute('data-key' , item.id)
    element.innerHTML = ` ${item.name} <button class="close">X</button>  `
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

function deleteTodo(id){
  todos = todos.filter(function(item){
    return item.id != id;
  });
  addToLocalStorage(todos);
  document.getElementById("to-do").innerHTML = todos.length
}

function deleteAllTodo(todos){
  if (todos){
    return todos = []
  }
  liste.innerHTML = ''
  addToLocalStorage(todos);
  document.getElementById("to-do").innerHTML = todos.length
}

getFromLocalStorage();