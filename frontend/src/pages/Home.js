import house from "../img/home-house.png"

const Home = () => {

  return (
    <div className="home">
      <h2 className="title-second">Welcome to Renteez</h2>
      <h1 className="title">A quick and easy way<br />to rent student apartments</h1>
      <a className="button mt-32" href="browse">Start Browsing</a>
      <img className="picture-right" src={house} alt="house" />
    </div>
  )
}

export default Home