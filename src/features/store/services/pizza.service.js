function getAllPizzas() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch("http://localhost:3000/api/", requestOptions);
}
function getPizza(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`http://localhost:3000/api/edit-pizza/${id}`, requestOptions);
}

const addPizza = async (item) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };

  return await fetch("http://localhost:3000/api/add-pizza", requestOptions).catch(
    function (error) {
      console.log("Found error: \n", error);
    }
  );
};

const deletePizza = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetch(
    `http://localhost:3000/api/delete-pizza/${id}`,
    requestOptions
  ).catch(function (error) {
    console.log("Found delete error: \n", error);
  });
};

const updatePizza = async (id, item) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };

  return await fetch(`http://localhost:3000/api/update-pizza/${id}`, requestOptions);
};

export default {
  getAllPizzas,
  getPizza,
  addPizza,
  deletePizza,
  updatePizza,
};
