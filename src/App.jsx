import { useEffect, useState } from "react";

import Product from "./Components/Product";

import "./App.css";

function App() {
  // State Val to hold the data of products
  const [products, setProducts] = useState([]);

  const [formState, setFormState] = useState({});

  const loadData = async () => {
    const response = await fetch("https://fakestoreapi.com/products?limit=5");

    const data = await response.json();

    setProducts(data);
  };

  // Form Handling
  // how to get the entered data from the from using react
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitting the form");
    if (formState.id) {
      updateProduct();
    } else {
      // formState gives the collected data
      createProduct();
    }
    setFormState({});
  };

  // add a new product to the list of products and display that in the UI
  const createProduct = () => {
    const tempProd = { ...formState };

    tempProd.id = Date.now();

    setProducts([tempProd, ...products]);
  };

  const updateProduct = () => {
    const index = products.findIndex((product) => product.id === formState.id);

    const tempProds = [...products];

    tempProds[index] = formState;

    setProducts(tempProds);
  };

  // Edit a product
  const editProduct = (pdId) => {
    const pdData = products.find((product) => product.id === pdId);

    setFormState(pdData);
  };

  // Delete a product from the list
  const deleteProduct = (prodId) => {
    setProducts(products.filter(({ id }) => prodId !== id));
  };

  // Function to handle the values entered in the form
  // const handleTitle = (e) => {
  //   setFormState({
  //     ...formState,
  //     title: e.target.value,
  //   });
  // };

  // const handleDescription = (e) => {
  //   setFormState({
  //     ...formState,
  //     description: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      // left hand side variable usage
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {console.log(formState)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Enter the title"
          value={formState.title || ""}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Enter the description"
          value={formState.description || ""}
        />
        <br />
        <br />
        <input
          type="number"
          onChange={handleChange}
          name="price"
          placeholder="Enter the price"
          value={formState.price || ""}
        />
        <br />
        <br />
        <input
          type="url"
          name="image"
          onChange={handleChange}
          placeholder="Enter the image url"
          value={formState.image || ""}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {products.map((product) => (
        <Product
          {...product}
          key={product.id}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      ))}
    </>
  );
}

export default App;
