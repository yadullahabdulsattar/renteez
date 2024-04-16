import { useState } from "react";
import { useLogin } from '../hooks/useLogin'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const icon_lock = <FontAwesomeIcon icon={faLock} />
  const icon_warning = <FontAwesomeIcon icon={faExclamationTriangle} />

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)

  }

  return (
    <div>
      <h2 className="form-title">Login to your account</h2>
      <div className='form-container'>

        {error && <div className="banner mt-16">{icon_warning} {error}</div>}

        <form method="post" className="login-form" onSubmit={handleSubmit}>

          <div>
            <label htmlFor='emailAddress'>Email Address</label>
            <input id='email' type="email" className='input' placeholder='name@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required></input>
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input id='password' type="password" className='input' placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required></input>
          </div>
          <button disabled={isLoading} className="button">{icon_lock} Login</button>

        </form>
      </div >

    </div>
  );
}

export default LoginPage;