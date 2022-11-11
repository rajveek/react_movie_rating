import "./styles.css";
export default function MovieResult({
  title,
  imgsrc,
  fullplot,
  rating,
  writer,
}) {
  return (
    <div className="col-3">
      <div className="card my-3 d-flex flex-column ">
        <img src={imgsrc} className="card-img-top card-img-top " alt="..." />
        <div className="card-body ">
          <h5 className="card-title">{title}</h5>
          <p className="card-text  text-truncate ">{fullplot}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">IMDB rating : {rating}</li>
          <li className="list-group-item text-truncate">
            Main writer: {writer[0]}
          </li>
        </ul>
      </div>
    </div>
  );
}
