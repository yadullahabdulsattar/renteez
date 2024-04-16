import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useSignup } from "../hooks/useSignup"
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const icon_lock = <FontAwesomeIcon icon={faLock} />
const icon_warning = <FontAwesomeIcon icon={faExclamationTriangle} />

const SignupPage = () => {

  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(title, firstName, lastName, email, password, phone)

  }

  return (
    <div>
      <h2 className="form-title">Register</h2>

      <div className='form-container'>

        {error && <div className="banner mt-16">{icon_warning} {error}</div>}

        <form method="post" className="register-form" onSubmit={handleSubmit}>

          <div className="fields-2">
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
              <input id='userName' type="text" className='input' placeholder='John' required value={firstName}
                onChange={(e) => setFirstName(e.target.value)}></input>

            </div>
            <div>
              <label htmlFor='lastName'>Last name</label>
              <input id='lastName' type="text" className='input' placeholder='Wick' required value={lastName}
                onChange={(e) => setLastName(e.target.value)}></input>
            </div>
          </div>

          <div>
            <label htmlFor='emailAddress'>Email Address</label>
            <input id='emailAddress' type="email" className='input' placeholder='name@example.com' required value={email}
              onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input id='password' type="password" className='input' placeholder='••••••••' required value={password}
              onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor='phone'>Phone</label>
            <input id='phone' type="tel" className='input' placeholder='+358' required value={phone}
              onChange={(e) => setPhone(e.target.value)}></input>
          </div>
          <button disabled={isLoading} className="button">{icon_lock} Register</button>
        </form>
      </div>

    </div>
  );
}

export default SignupPage;