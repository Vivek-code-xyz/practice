function Card(props) {
  return (
    <div className="Cardcontainer">
      <img
        style={{ height: "auto", width: "95%", marginBottom: "15px" }}
        src={props.imgurl}
      />
      <h3>{props.product}</h3>
      <h1>{props.offer}</h1>
      <h3>Shop Now</h3>
    </div>
  );
}

export default Card;