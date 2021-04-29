var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var titleValue = document.getElementById("item");
const btnSubmit = document.querySelector(".btn");
var filter = document.getElementById("filter");
//var output = "";


const renderPosts = (posts) => {
  posts.forEach((post) => {
    let output = `
      
      <li class="list-group-item" id=${post.id}>${post.title}<div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-success btn-sm float-right edit margins" > Edit </button> 
          <button class="btn btn-danger btn-sm float-right delete margins" > X </button>
         </div>
      </li>`;
      // create a temorary div element to hold the html
      let tempElement = document.createElement('div');
      // attach this output tho the temp elemnt
      tempElement.innerHTML = output;
      // insert the single created element into the 'items' container
      document.getElementById("items").append(tempElement.firstElementChild);
      // remove temp element to release memory and prevent possible bindings
      tempElement.remove();
  });
  
};

fetch("/tasks", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    renderPosts(data);
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
  // console.log(newItem);

  /* Shkruaj te dhenat ne db*/

  fetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ title: newItem }),

    // redirect:"manual",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // rest form
      form.reset();
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);

      /* Pret konfirmimin nga DB */

      /* Vazhdo me kodin per stimin e elementit ne UI */
    })
    .catch((message) => {
      console.log(message);
    });
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var id = e.target.parentElement.parentElement.id;
      //  console.log(id);

      fetch(`/tasks/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // Do some stuff...

          let li = e.target.parentElement.parentElement;
          // console.log(li);
          itemList.removeChild(li);
        })
        .catch((err) => console.log(err));
      // .then(() => location.reload());
    }
  }
  // var li = e.target.parentElement.parentElement;
  //     console.log(li);
  //     itemList.removeChild(li);
}

//Edit
function editItems(e) {
  if (e.target.classList.contains("edit")) {
    var id = e.target.parentElement.parentElement.id;
    // console.log(id);

    const parent = e.target.parentElement;
    // console.log(parent);

    var titleContent = parent.parentElement.firstChild.textContent;
    // console.log(titleContent);

    titleValue.value = titleContent;
    // console.log(titleValue);

    btnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log("post updated");
      fetch(`/tasks/` + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleValue.value,
        }),
      })
        .then((res) => res.json())
        .then(() => location.reload());
    });
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
