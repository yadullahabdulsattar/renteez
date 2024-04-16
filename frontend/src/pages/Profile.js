import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from '../components/Card';
import { useAuthContext } from "../hooks/useAuthContext";
import useField from "../hooks/useField"
import loading from '../img/loading.svg'
import { useProfile } from '../hooks/useProfile'
import { useOffer } from "../hooks/useOffer"

const fetchOffersUrl = `${process.env.REACT_APP_API_URL}/api/listings/userlistings`;
const fetchUserInfoUrl = `${process.env.REACT_APP_API_URL}/api/user/me`;

const Profile = (props) => {
  const firstNameInput = useField("text", "John")
  const lastNameInput = useField("text", "Doe")
  const emailInput = useField("email", "john.doe@example.com")
  const passwordInput = useField("password", "Enter one to edit")
  const phoneInput = useField("tel", "+358")

  const [offers, setOffers] = useState(null)
  const [title, setTitle] = useState(null)
  const [formReady, setFormReady] = useState(false)
  const { user } = useAuthContext()
  const { action } = props;
  const { id } = useParams();
  const { editProfile, error, isLoading, success, deleteUser } = useProfile();
  const { deleteOffer } = useOffer()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(fetchOffersUrl, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setOffers(json)
      }
    }

    if (action) {
      if (action === "delete") {
        if (window.confirm("Do you really want to delete this offer ?\nThis action cannot be undone !")) {
          deleteOffer(id)
          navigate("/profile")
        } else {
          console.log("cancel");
          navigate("/profile")
        }
      }
    }

    const fetchUserInfo = async () => {
      const response = await fetch(fetchUserInfoUrl, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        firstNameInput.setValue(json.first_name)
        lastNameInput.setValue(json.last_name)
        emailInput.setValue(json.email)
        phoneInput.setValue(json.phone)
        setTitle(json.title)
        setFormReady(true)
      }
    }

    if (user) {
      fetchOffers()
      fetchUserInfo()

    }
  }, [user, action])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await editProfile(title, firstNameInput.value, lastNameInput.value, emailInput.value, passwordInput.value, phoneInput.value)

  }

  const handleClick = () => {
    if (window.confirm("Do you really want to delete your account ?\nAll your offers will be deleted as well.\nThis operation can't be undone !")) {
      deleteUser()
    }
  }

  return (
    <div>
      <h2 className="title-second">Your details</h2>

      {error && <div className="banner mt-16">{error}</div>}
      {success && <div className="banner-success mt-16">{success}</div>}

      {formReady ? (

        <div>

          <form className="search-form" onSubmit={handleSubmit}>


            <div>
              <label htmlFor='title'>Title</label>
              <select className='input' id='rentPrice' name='rentPrice' value={title}
                onChange={(e) => setTitle(e.target.value)} required>
                <option value='' disabled>Select...</option>
                <option value='mr'>Mr</option>
                <option value='ms'>Ms</option>
              </select>
            </div>
            <div>
              <label htmlFor='userName'>First name</label>
              <input {...firstNameInput}></input>
            </div>
            <div>
              <label htmlFor='lastName'>Last name</label>
              <input {...lastNameInput}></input>
            </div>
            <div>
              <label htmlFor='emailAddress'>Email Address</label>
              <input {...emailInput}></input>
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input {...passwordInput}></input>
            </div>
            <div>
              <label htmlFor='phone'>Phone</label>
              <input {...phoneInput}></input>
            </div>
            <button disabled={isLoading} className="button"> Update</button>
          </form>

          <button className="delete-account" onClick={handleClick}>Delete account</button>

        </div>
      ) :
        <img src={loading} className="loading" alt="loading" />
      }

      <hr className="mt-32" />
      <h2 className="title-second">Your offers</h2>
      {offers ? (
        offers.length > 0 ? (
          <div className="offers">
            {offers.map((offer) => <Card key={offer._id} offer={offer} editable="true" />)}
          </div>
        ) : (
          <p className="offer-message">Yo have no offers</p>
        )
      ) : (
        <img src={loading} className="loading" alt="loading" />
      )}

      <Link className="button mt-32" to="/create">New offer</Link>
    </div>
  );
}

export default Profile;