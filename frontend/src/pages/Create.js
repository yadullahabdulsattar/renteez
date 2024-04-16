import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react"
import { useOffer } from "../hooks/useOffer"
import useField from '../hooks/useField';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useParams } from 'react-router-dom';
import loading from '../img/loading.svg'

const icon_warning = <FontAwesomeIcon icon={faExclamationTriangle} />

const CreatePage = (props) => {

  const { action } = props;
  const { id } = useParams();
  const titleInput = useField("text", "Name your offer")
  const descriptionInput = useField("text", "Describe your property in some lines")
  const addressInput = useField("text", "Kirjanpitäjänkuja 4")
  const postalCodeInput = useField("text", "02770")
  const surfaceInput = useField("text", "105")
  const roomCountInput = useField("text", "4.5")
  const transportInput = useField("text", "300")
  const rentInput = useField("text", "479")
  const chargesInput = useField("text", "30")
  const [picture, setPicture] = useState(null);
  const [city, setCity] = useState('')
  const [elevator, setElevator] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [water, setWater] = useState(false);
  const [parking, setParking] = useState(false);
  const [disability, setDisability] = useState(false);
  const [internet, setInternet] = useState(false);
  const [pictureError, setPictureError] = useState(false);
  const [editMode, setEditMode] = useState(false)


  const { createOffer, editOffer, getOffer, error, retrieveOfferError, success, isLoading } = useOffer()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editMode) {
      await editOffer(id,
        titleInput.value,
        descriptionInput.value,
        addressInput.value,
        postalCodeInput.value,
        surfaceInput.value,
        roomCountInput.value,
        transportInput.value,
        rentInput.value,
        chargesInput.value,
        picture,
        city,
        elevator,
        electricity,
        water,
        parking,
        disability,
        internet
      )
    } else {
      await createOffer(
        titleInput.value,
        descriptionInput.value,
        addressInput.value,
        postalCodeInput.value,
        surfaceInput.value,
        roomCountInput.value,
        transportInput.value,
        rentInput.value,
        chargesInput.value,
        picture,
        city,
        elevator,
        electricity,
        water,
        parking,
        disability,
        internet
      )
    }

  }

  const retrieveOfferInfo = async (id) => {

    const offerInfo = await getOffer(id)
    if (retrieveOfferError) {
      <Navigate to="/profile" />
    }
    titleInput.setValue(offerInfo.title);
    descriptionInput.setValue(offerInfo.description);
    addressInput.setValue(offerInfo.address)
    postalCodeInput.setValue(offerInfo.postalCode)
    setCity(offerInfo.city)
    transportInput.setValue(offerInfo.transport)
    surfaceInput.setValue(offerInfo.surface)
    roomCountInput.setValue(offerInfo.roomCount)
    rentInput.setValue(offerInfo.rent)
    chargesInput.setValue(offerInfo.charges)
    setElevator(offerInfo.elevator)
    setElectricity(offerInfo.electricity)
    setWater(offerInfo.water)
    setParking(offerInfo.parking)
    setDisability(offerInfo.disability)
    setInternet(offerInfo.internet)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSize = file.size;
      setPictureError(fileSize > 1e6)

      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setPicture(imageSrc);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    switch (action) {
      case 'edit':
        setEditMode(true)
        retrieveOfferInfo(id);
        break;
      default:
        break;
    }
  }, [action, id]
  );

  if (editMode && isLoading) {
    return (
      <div>
        <img src={loading} className="loading" alt="loading" />
      </div>
    );
  } else {
    return (

      <div>

        <h2 className="form-title">{editMode ? "Edit your offer" : "Create a new offer"}</h2>

        <div className='form-container'>

          {error && <div className="banner mt-16">{icon_warning} {error}</div>}
          {success && <div className="banner-success mt-16">{success}</div>}

          <form method="post" className="register-form" encType="multipart/form-data" onSubmit={handleSubmit}>

            <div>
              <label htmlFor='title'>Title</label>
              <input {...titleInput} required />
            </div>

            <div>
              <label htmlFor='description'>Description</label>
              <textarea rows="5" {...descriptionInput} required></textarea>
            </div>

            <div className='mb-16'>
              <label htmlFor='title'>Picture (max 1 MB) {editMode && " - upload to replace"}</label><br />
              <input type="file" className='mt-16' onChange={handleImageChange} accept="image/png, image/jpeg" required={!editMode} />
            </div>
            {pictureError && (<span>The picture you provided is too heavy</span>)}

            <div className='flex mb-8'>
              <div className='flex-60 mr-16'>
                <label htmlFor='address'>Address</label>
                <input {...addressInput} required />
              </div>
              <div className='flex-10 mr-16'>
                <label htmlFor='postalCode'>Postcode</label>
                <input {...postalCodeInput} required pattern="\d*" maxLength="5" />
              </div>
              <div className='flex-30'>
                <label htmlFor='city'>City</label>
                <select className='input' id='city' name='city' value={city} onChange={(e) => setCity(e.target.value)} required>
                  <option value='' disabled>Choose...</option>
                  <option value='Helsinki'>Helsinki</option>
                  <option value='Espoo'>Espoo</option>
                  <option value='Vantaa'>Vantaa</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor='city'>Distance to the nearest public transport stop</label>
              <div className="flex">
                <div className="flex-20">
                  <input maxLength="4" {...transportInput} required />
                </div>
                <div className="flex-10">
                  <span className="ml-16">meters</span>
                </div>
                <div className="flex-70"></div>
              </div>
            </div>

            <hr />

            <div className='flex'>
              <div className='flex-50 mr-16'>
                <label htmlFor='address'>Surface</label>
                <div className="flex">
                  <div className="flex-80">
                    <input {...surfaceInput} required />
                  </div>
                  <div className="flex-20">
                    <span className="ml-16">m²</span>
                  </div>
                </div>
              </div>
              <div className='flex-50'>
                <label htmlFor='postalCode'>Room count</label>
                <div className="flex">
                  <div className="flex-80">
                    <input {...roomCountInput} required />
                  </div>
                  <div className="flex-20">
                    <span className="ml-16">r</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className='flex-50 mr-16'>
                <label htmlFor='address'>Monthly rent</label>
                <div className="flex">
                  <div className="flex-80">
                    <input {...rentInput} required maxLength="5" />
                  </div>
                  <div className="flex-20">
                    <span className="ml-16">€</span>
                  </div>
                </div>
              </div>
              <div className='flex-50'>
                <label htmlFor='postalCode'>Charges amount</label>
                <div className="flex">
                  <div className="flex-80">
                    <input {...chargesInput} maxLength="4" required />
                  </div>
                  <div className="flex-20">
                    <span className="ml-16">€</span>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="services-checks mb-32">
              <label htmlFor='roomCount'>Included services</label>

              <ul className="property-details">
                <li>
                  <input type="checkbox" id="elevator" name="elevator" defaultChecked={elevator} onChange={(e) => setElevator(e.target.checked)} />
                  <label htmlFor="elevator">Elevator</label>
                </li>
                <li>
                  <input type="checkbox" id="electricity" name="electricity" defaultChecked={electricity} onChange={(e) => setElectricity(e.target.checked)} />
                  <label htmlFor="electricity">Electricity</label>
                </li>
                <li>
                  <input type="checkbox" id="water" name="water" defaultChecked={water} onChange={(e) => setWater(e.target.checked)} />
                  <label htmlFor="water">Water</label><br />
                </li>
                <li>
                  <input type="checkbox" id="parking" name="parking" defaultChecked={parking} onChange={(e) => setParking(e.target.checked)} />
                  <label htmlFor="parking">Parking</label><br />
                </li>
                <li>
                  <input type="checkbox" id="disability" name="disability" defaultChecked={disability} onChange={(e) => setDisability(e.target.checked)} />
                  <label htmlFor="disability">Adapted for the disabled</label><br />
                </li>
                <li>
                  <input type="checkbox" id="internet" name="internet" defaultChecked={internet} onChange={(e) => setInternet(e.target.checked)} />
                  <label htmlFor="internet">Internet</label>
                </li>
              </ul>
            </div>


            <button disabled={isLoading || pictureError} className="button">{editMode ? "Save changes" : "Create offer"}</button>
          </form>
        </div >

      </div >
    );
  }
}

export default CreatePage;