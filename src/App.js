import React, { useState } from 'react'
import Segement from './components/segments'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from 'react-bootstrap'
import './app.css'

const App = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="app">
      <Button className="colorless-button" onClick={handleShow}>
        Save Segment
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="modal-right"
      >
        <Modal.Header closeButton>
          <Modal.Title>Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Segement />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App
