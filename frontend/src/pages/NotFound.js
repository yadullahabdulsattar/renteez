import house from "../img/not-found.jpg"

const NotFound = () => {

  return (
    <div className="notfound">
      <h2 className="title-second">Sorry, something hasn't worked well.</h2>
      <h1 className="title">Unfortunately the page you are looking for doesn't exists.</h1>
      <img className="picture-right" src={house} alt="house" />
    </div>
  )
}

export default NotFound