import React, { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    setEmail('')
    setPassword('')
  }

  const handleChange = event => {
    const { name, value } = event.target
    if (name === "email") setEmail(value)
    if (name === "password") setPassword(value)
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput 
          name="email" 
          type="email" 
          value={email} 
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput 
          name="password" 
          type="password" 
          value={password} 
          handleChange={handleChange}
          label="Password"
          required
        />
        <CustomButton type="submit"> Sign In </CustomButton>
        <CustomButton onClick={signInWithGoogle}> Sign In with Google </CustomButton>
      </form>
    </div>
  )
}

export default SignIn
