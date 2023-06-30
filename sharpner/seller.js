var form = document.getElementById("form");
form.addEventListener("submit", addlocal);

function addlocal(e) {
  e.preventDefault();
  var price = document.getElementById("price").value;
  var product = document.getElementById("product").value;
  var category = document.getElementById("chooseCategory").value;

  const object = {
    price,
    product,
    category,
  };

  axios
    .post(
      "http://crudcrud.com/api/b05bc6d9ea7e4ae2a8d65f78d7832eae/sellerData",
      object
    )
    .then((response) => {
      console.log(response);
      showOnScreen(response.data);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> SOMETHING WENT WRONG </h4>";
      console.log(error);
    });

  console.log("inside addlocal function");

  document.getElementById("price").value = " ";
  document.getElementById("product").value = " ";
  document.getElementById("chooseCategory").value = " ";
}

function showOnScreen(obj) {
  console.log("create new order for table");

  if (obj.category == 1) {
    const parentNode = document.getElementById("t1");
    const childNode = `<li id="${obj._id}">${obj.price} - ${obj.product} - electronic Item 
                            <button onclick="deleteUser('${obj._id}')">Delete</button>
                            </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childNode;
  }
  if (obj.category == 2) {
    const parentNode = document.getElementById("t1");
    const childNode = `<li id="${obj._id}">${obj.price} - ${obj.product} - Skincare Item 
                            <button onclick="deleteUser('${obj._id}')">Delete</button>
                            </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childNode;
  }
  if (obj.category == 3) {
    const parentNode = document.getElementById("t1");
    const childNode = `<li id="${obj._id}">${obj.price} - ${obj.product} - Food Item
                            <button onclick="deleteUser('${obj._id}')">Delete</button>
                            </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childNode;
  }
}

function deleteUser(userId) {
  console.log(userId);
  axios
    .delete(
      `http://crudcrud.com/api/b05bc6d9ea7e4ae2a8d65f78d7832eae/sellerData/${userId}`
    )
    .then((response) => {
      console.log(response);
      removeUser(userId);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> SOMETHING WENT WRONG </h4>";
      console.log(error);
    });
}

function removeUser(userId) {
  const nodetoremove = document.getElementById(userId);
  parentid = nodetoremove.parentNode.id;

  const parent_node = document.getElementById(parentid);
  if (nodetoremove) {
    parent_node.removeChild(nodetoremove);
  }
}

document.addEventListener("DOMContentLoaded", refresh);
function refresh(e) {
  e.preventDefault();
  axios
    .get("http://crudcrud.com/api/b05bc6d9ea7e4ae2a8d65f78d7832eae/sellerData")
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        showOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
