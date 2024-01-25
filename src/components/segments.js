import React, { useState } from "react"

const Segment = () => {
  const [name, setName] = useState("")
  const [selected, setSelected] = useState('')
  const [results, setResults] = useState([])
  const [added, setAdded] = useState([])
  const [disable, setDisable] = useState([])
  const [message, setMessage] = useState('')

  const options = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]

  const edit = (event) => {
    setSelected(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    if (selected && !added.includes(selected)) {
      setAdded([...added, selected])
      setResults([...results, selected])
      setDisable([...disable, selected])
    }
    setSelected(null)
  }

  const update = (index, newValue) => {
    const updatedSchemas = [...added]
    updatedSchemas[index] = newValue
    setAdded(updatedSchemas)
  }

  const cancel = () => {
    setName("");
    setAdded([]);
    setSelected("");
    setResults([]);
    setDisable([]);
    setMessage("");
  }

  const dispatch = () => {
    const segmentData = {
      segment_name: name,
      schema: added.map((schema) => ({ [schema]: schema }))
    }
    setName("")
    setAdded([])
    fetch('http://localhost:5000/api/segments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segmentData)
    })
      .then((response) => {
        if (!response.ok) {
          if (response.headers.get('content-type')?.includes('text/html')) {
            throw new Error('Server returned an HTML error page')
          }
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json()
      })
      .then((responseData) => {
        console.log('Data sent to server:', responseData)
        setMessage('Data successfully sent to the server.')
      })
      .catch((error) => {
        console.error('Error sending data to server:', error)
        setMessage('Error sending data to the server.')
      })
  }

  return (
    <>
      <div>
        <label>Enter the Name of the Segment</label>
        <input
          type="text"
          placeholder="Name of the segment"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="added-schema">
        {added.map((schema, index) => (
          <div key={schema}>
            <select value={schema} onChange={(e) => update(index, e.target.value)}>
              {options
                .filter((option) => !added.includes(option.value) || option.value === schema)
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
      <br />
      <div>
        <select value={selected} onChange={edit}>
          <option value="" disabled selected>Add Schema to Segment</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={disable.includes(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
        {selected && (
          <a href="#" onClick={add} style={{ color: 'green' }}>+add new Schema</a>
        )}
      </div>
      <br />
      <button type="button" className="btn btn-success" onClick={dispatch}>
        Save the Segment
      </button>
      <button className="cancel-btn" onClick={cancel}>
        Cancel
      </button>
      {message && <p>{message}</p>}
    </>
  )
}

export default Segment
