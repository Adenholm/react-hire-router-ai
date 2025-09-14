import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function HireForm({ person, setHiredPeople }) {
  const [wage, setWage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const wageNumber = Number(wage)
    if (!wage || isNaN(wageNumber) || wageNumber <= 0) {
      setError('Please enter a valid wage greater than 0')
      return
    }
    const hired = { ...person, wage: wageNumber }
    setHiredPeople(prev => [...prev, hired])
    navigate('/')
  }

  function handleChange(e) {
    setWage(e.target.value)
    setError('')
  }

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="wage">Wage Offer</label>
      <input
        type="number"
        id="wage"
        name="wage"
        min="1"
        step="any"
        onChange={handleChange}
        value={wage}
        required
      />
      <button type="submit">Hire</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
HireForm.propTypes = {
  person: PropTypes.object.isRequired,
  setHiredPeople: PropTypes.func.isRequired,
}

export default HireForm;
