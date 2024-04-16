import { useEffect, useState } from "react"
import Card from '../components/Card';
import loading from '../img/loading.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const icon_search = <FontAwesomeIcon icon={faMagnifyingGlass} />

const apiUrl = `${process.env.REACT_APP_API_URL}/api/listings`;

const Browse = () => {
  const [offers, setOffers] = useState(null)
  const [city, setCity] = useState('');
  const [surface, setSurface] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [transport, setTransport] = useState('');
  const [rent, setRent] = useState('');
  const [elevator, setElevator] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [water, setWater] = useState(false);
  const [parking, setParking] = useState(false);
  const [disability, setDisability] = useState(false);
  const [internet, setInternet] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      city,
      surface,
      roomCount,
      transport,
      rent,
      elevator,
      electricity,
      water,
      parking,
      disability,
      internet,
    };

    const response = await fetch(apiUrl + "/filtered", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }

    if (response.ok) {
      console.log(json)
      setOffers(json)
      setSearch(true)
      setIsLoading(false)
    }

  }

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(apiUrl)
      const json = await response.json()

      if (response.ok) {
        setOffers(json)
      }
    }

    fetchOffers()
  }, [])



  return (
    <div>
      <h2 className="title-second">Search for an offer</h2>

      {error && <div className="banner mt-16">{error}</div>}

      <form method="get" onSubmit={handleSubmit}>
        <div className="search-form">
          <div>
            <label htmlFor='city'>City</label>
            <select className='input' id='city' name='city' value={city} onChange={(e) => setCity(e.target.value)}>
              <option value=''>Any</option>
              <option value='Helsinki'>Helsinki</option>
              <option value='Espoo'>Espoo</option>
              <option value='Vantaa'>Vantaa</option>
            </select>
          </div>

          <div>
            <label htmlFor='surface'>Surface</label>
            <select className='input' id='surface' name='surface' value={surface} onChange={(e) => setSurface(e.target.value)}>
              <option value=''>Any</option>
              <option value='-20'>less than 20 m²</option>
              <option value='20-40'>20 m² - 40 m²</option>
              <option value='40-50'>40 m² - 50 m²</option>
              <option value='50-100'>50 m² - 100 m²</option>
              <option value='100+'>100 m² and more</option>

            </select>
          </div>

          <div>
            <label htmlFor='roomCount'>Room count</label>
            <select className='input' id='roomCount' name='roomCount' value={roomCount} onChange={(e) => setRoomCount(e.target.value)}>
              <option value=''>Any</option>
              <option value='1-2'>1-2</option>
              <option value='2-3'>2-3</option>
              <option value='3-4'>3-4</option>
              <option value='4+'>more than 4</option>
            </select>
          </div>

          <div>
            <label htmlFor='transport'>Distance from transports</label>
            <select className='input' id='transport' name='transport' value={transport} onChange={(e) => setTransport(e.target.value)}>
              <option value=''>Any</option>
              <option value='-100'>less than 100m</option>
              <option value='100-150'>100m-150m</option>
              <option value='150-300'>150m-300m</option>
              <option value='300-500'>300m-500m</option>
              <option value='500+'>500m and more</option>

            </select>
          </div>

          <div>
            <label htmlFor='rent'>Rent price</label>
            <select className='input' id='rent' name='rent' value={rent} onChange={(e) => setRent(e.target.value)}>
              <option value=''>Any</option>
              <option value='-400'>less than 400€</option>
              <option value='400-500'>400€-500€</option>
              <option value='500-600'>500€-600€</option>
              <option value='600-700'>600€-700€</option>
              <option value='700+'>700€ and more</option>
            </select>
          </div>
        </div>

        <div className="services-checks mb-32">
          <label htmlFor='roomCount'>Included services</label>

          <ul className="services-list">
            <li>
              <input type="checkbox" id="elevator" name="elevator" checked={elevator} onChange={(e) => setElevator(e.target.checked)} />
              <label htmlFor="elevator">Elevator</label>
            </li>
            <li>
              <input type="checkbox" id="electricity" name="electricity" checked={electricity} onChange={(e) => setElectricity(e.target.checked)} />
              <label htmlFor="electricity">Electricity</label>
            </li>
            <li>
              <input type="checkbox" id="water" name="water" checked={water} onChange={(e) => setWater(e.target.checked)} />
              <label htmlFor="water">Water</label><br />
            </li>
            <li>
              <input type="checkbox" id="parking" name="parking" checked={parking} onChange={(e) => setParking(e.target.checked)} />
              <label htmlFor="parking">Parking</label><br />
            </li>
            <li>
              <input type="checkbox" id="disability" name="disability" checked={disability} onChange={(e) => setDisability(e.target.checked)} />
              <label htmlFor="disability">Disability</label><br />
            </li>
            <li>
              <input type="checkbox" id="internet" name="internet" checked={internet} onChange={(e) => setInternet(e.target.checked)} />
              <label htmlFor="internet">Internet</label>
            </li>
          </ul>
        </div>

        <button className="button" disabled={isLoading}>{icon_search} Search</button>
      </form >
      <hr />
      <h2 className="title-second">{search ? "Search results" : "All offers"}</h2>

      {offers ? (
        offers.length > 0 ? (
          <div className="offers">
            {offers.map((offer) => <Card key={offer._id} offer={offer} />)}
          </div>
        ) : (
          <p className="offer-message">No offer found matching your criteria</p>
        )
      ) : (
        <img src={loading} className="loading" alt="loading" />
      )}

    </div>
  );
}

export default Browse;