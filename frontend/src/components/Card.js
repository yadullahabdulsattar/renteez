import { Link } from "react-router-dom";
import empty from '../img/empty.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faRulerCombined, faDoorOpen, faTrain, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const icon_address = <FontAwesomeIcon color="pink" icon={faLocationDot} />
const icon_rooms = <FontAwesomeIcon icon={faDoorOpen} />
const icon_transports = <FontAwesomeIcon icon={faTrain} />
const icon_surface = <FontAwesomeIcon icon={faRulerCombined} />
const icon_edit = <FontAwesomeIcon icon={faEdit} />
const icon_delete = <FontAwesomeIcon icon={faTrashCan} />

const Card = ({ offer, editable }) => {
    return (
        <Link to={`/offer/${offer._id}`}>

            <div className="offer-card">

                <img className="offer-picture" src={offer.picture ? offer.picture : empty} alt="offer" />
                <div className="offer-details">
                    <h3>{offer.title}</h3>
                    <p className="offer-address">{icon_address} {offer.address}, {offer.city}</p>
                    <p className="offer-infos">{icon_surface} {offer.surface} m²{icon_rooms} {offer.roomCount} rooms {icon_transports} ~{offer.transport}m</p>
                    <p className="offer-price">{offer.rent}€/mo<br /><span className="charges">{offer.charges ? `(excl. ${offer.charges}€ charges)` : "(charges included)"}</span></p>
                    {editable && (
                        <div className="edit-actions">
                            <Link to={`/edit/${offer._id}`}><button className="mr-8">{icon_edit}</button></Link>
                            <Link to={`/delete/${offer._id}`}><button>{icon_delete}</button></Link>
                        </div>
                    )
                    }
                </div>
            </div>
        </Link>

    );
}

export default Card;