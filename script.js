var form = document.getElementById("addForm");
var itemList = document.getElementById("items");

var filter = document.getElementById("filter");
window.stop();

// let btnClear = document.querySelector("#submits");
// console.log(btnClear);
// let inputs = document.getElementById("item");
// console.log(inputs);
// btnClear.addEventListener("click", () => {
//   inputs.value = '';
    
//   });


// function myFunction() {
//   form.reset();
// }

fetch("//127.0.0.1:3000/tasks", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    var output = " ";
    for (var i = 1; i < data.length; i++) {
      output +=
        `<li class="list-group-item" id=${data[i].id}>` 
        // data[i].id
        // i +
        // ") " +
        + data[i].title +
        ` <button class="btn btn-danger btn-sm float-right delete margins" > X </button>` +
        " " +
        '<button class="btn btn-success  btn-sm float-right edit margins" > Edit </button>' +
        "</li>";
    }
    document.getElementById("items").innerHTML = output;
  });

// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);
itemList.addEventListener("click", editItems);

// Add item
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById("item").value;
  console.log(newItem);
  // var numer = document.getElementByTagName("ul").id;
  // var id = e.target.parentElement.id;
  // console.log(numer);
  e.preventDefault();

  /* Shkruaj te dhenat ne db*/

  fetch("//127.0.0.1:3000/tasks", {
    method: "POST",
    body: JSON.stringify({ title: newItem }),

    // redirect:"manual",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((message) => {
      console.log(message);
    });

  e.preventDefault();

  /* Pret konfirmimin nga DB */

  /* Vazhdo me kodin per stimin e elementit ne UI */
  // Get input value

  // Create new li element
  // var id = e.target.parentElement.id;
  // console.log(id);
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  // li.id = "id";
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create del button element
  var deleteBtn = document.createElement("button");
  var editBtn = document.createElement("button");

  // Add classes to del button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  editBtn.className = "btn btn-success btn-sm float-right edit";

  // Append text node
  deleteBtn.appendChild(document.createTextNode("X"));
  editBtn.appendChild(document.createTextNode("Edit"));

  // Append button to li
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  // Append li to list
  itemList.appendChild(li);


  let btnClear = document.querySelector("#submits");
  console.log(btnClear);
  let inputs = document.getElementById("item");
  console.log(inputs);
  btnClear.addEventListener("click", () => {
    inputs.value = '';
      // newItem.reset();
    });
 

  // output +=
  //   `<li class="list-group-item" id=${data[i].id}>` +
  //   data[i].id +
  //   ` ` +
  //   data[i].title +
  //   ` <button class="btn btn-danger btn-sm float-right delete margins" > X </button>` +
  //   " " +

  //   '<button class="btn btn-success  btn-sm float-right edit margins" > Edit </button>' +
  e.preventDefault();
  //   "</li>";
  // newItem = '';
  
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      // var id = document.getElementById()

      var id = e.target.parentElement.id;
      //  console.log(a);
      // e.stopImmediatePropagation();
      //   e.preventDefault();

      fetch(`http://localhost:3000/tasks/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // Do some stuff...
        })
        .catch((err) => console.log(err));

      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

//Edit
function editItems(e) {
  if (e.target.classList.contains("edit")) {
    // var id = document.getElementById()
    var id = e.target.parentElement.id;


    const parent = e.target.parentElement;
    console.log(parent);
    // var id = e.target.parentElement.className('.list-group-item').textContent;
    // console.log(id);
    // var titleContent = parent.querySelector('.list-group-item').textContent;
    // console.log(titleContent);
    
    // e.stopImmediatePropagation();
    //   e.preventDefault();

    fetch(`http://localhost:3000/tasks/`+id, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    
  }
}

// Filter Items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName("li");
  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
