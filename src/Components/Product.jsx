import PropTypes from "prop-types";

const Product = ({
  id,
  title,
  description,
  price,
  image,
  deleteProduct,
  editProduct,
}) => {
  return (
    <div
      id={id}
      style={{
        border: "1px solid",
        margin: 16,
        padding: 16,
        textAlign: "center",
      }}
    >
      <img
        style={{ width: 210, height: 300, objectFit: "contain" }}
        src={image}
        alt={title}
      />
      <h3>{title}</h3>
      <h4>$ {price}</h4>
      <p>{description}</p>
      <button onClick={() => editProduct(id)}>Edit</button>
      <button onClick={() => deleteProduct(id)}>Delete</button>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  deleteProduct: PropTypes.func,
  editProduct: PropTypes.func,
};

export default Product;
