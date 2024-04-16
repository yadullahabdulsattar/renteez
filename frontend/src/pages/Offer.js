import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faRulerCombined, faDoorOpen, faTrain, faElevator, faWifi, faPlug, faSquareParking, faWheelchairMove, faDroplet, faUser, faCalendar, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';
import empty from '../img/empty.jpg'
import loading from '../img/loading.svg'
const apiUrl = `${process.env.REACT_APP_API_URL}/api/listings`;
const icon_address = <FontAwesomeIcon color="pink" icon={faLocationDot} />
const icon_rooms = <FontAwesomeIcon icon={faDoorOpen} />
const icon_transports = <FontAwesomeIcon icon={faTrain} />
const icon_surface = <FontAwesomeIcon icon={faRulerCombined} />
const icon_elevator = <FontAwesomeIcon icon={faElevator} />
const icon_internet = <FontAwesomeIcon icon={faWifi} />
const icon_parking = <FontAwesomeIcon icon={faSquareParking} />
const icon_disability = <FontAwesomeIcon icon={faWheelchairMove} />
const icon_power = <FontAwesomeIcon icon={faPlug} />
const icon_water = <FontAwesomeIcon icon={faDroplet} />
const icon_user = <FontAwesomeIcon icon={faUser} />
const icon_calendar = <FontAwesomeIcon icon={faCalendar} />
const icon_envelope = <FontAwesomeIcon icon={faEnvelope} />
const icon_phone = <FontAwesomeIcon icon={faPhone} />

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState("")

  useEffect(() => {
    const fetchOffer = async () => {
      const response = await fetch(`${apiUrl}/${id}`)
      const json = await response.json()

      if (response.ok) {
        setOffer(json)
      }
    }

    fetchOffer()

  }, [id])

  if (offer) {
    return (
      <div className="offer">
        <h2 className="title-second mb-16">Details of the offer</h2>
        <img src={offer.picture ? offer.picture : empty} className="offer-detail-picture" alt="offer" />
        <h1 className="offer-title">{offer.title}</h1>
        <h2 className="offer-address">{icon_address} {offer.address}, {offer.postalCode} {offer.city}</h2>
        <ul className="offer-services">
          <li>{icon_surface} {offer.surface} m²</li>
          <li>{icon_rooms} {offer.roomCount} rooms</li>
          <li>{icon_transports} ~{offer.transport}m</li>
          <li>{icon_elevator} {offer.elevator ? "yes" : "no"}</li>
          <li>{icon_internet} {offer.internet ? "included" : "not included"}</li>
          <li>{icon_parking} {offer.parking ? "yes" : "no"}</li>
          <li>{icon_disability} {offer.disability ? "adapted" : "unadapted"}</li>
          <li>{icon_power} {offer.electricity ? "included" : "not included"}</li>
          <li>{icon_water} {offer.water ? "included" : "not included"}</li>
        </ul>
        <p className="offer-text">{offer.description}</p>
        <h1 className="offer-price mt-32 mb-32">{offer.rent}€/mo  <span className="charges">{offer.charges ? `(excl. ${offer.charges}€ charges)` : "(charges included)"}</span></h1>
        <div className="contact-info">
          <h3>Offer published by {icon_user} {offer.createdBy} on {icon_calendar} {offer.createdAt && format(new Date(offer.createdAt), 'dd.MM.yyyy')}</h3>
          <a className="button mt-16 mr-16" href={`mailto:${offer.contactEmail}`}>{icon_envelope} Contact by email</a>
          <a className="button mt-16" href={`tel:${offer.contactPhone}`}>{icon_phone} Contact by phone</a>
        </div>
      </div>

    );
  } else {
    return (
      <div className="offer">
        <img src={loading} className="loading" alt="loading" />
      </div>
    );
  }
}

export default Offer;