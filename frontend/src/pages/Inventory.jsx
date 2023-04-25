import { FaClipboardList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { getInstrument, deleteInstrument, updateInstrument, reset } from '../features/inventory/inventorySlice';


const Inventory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load information for instrument inventory
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
  const { instruments } = useSelector((state) => state.instruments)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/inventory')
    }
    dispatch(getInstrument())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const [itemDetail, setItemDetail] = useState([])
  const [show, setShow] = useState(false)
  const [updatedItem, setUpdatedItem] = useState([])
  const [editModal, setEditModal] = useState(false)

  const itemDisplay = (e) => {
    setItemDetail(e)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const removeItem = () => {
    dispatch(deleteInstrument(itemDetail._id))
    window.location.reload(true)
  }

  const updateItemModal = () => {
    setEditModal(true)
    setUpdatedItem(itemDetail)
    handleClose()
  }

  const onChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value })
  }

  const editItem = () => {
    dispatch(updateInstrument({ instId: updatedItem._id, instData: updatedItem }))
    setEditModal(false)
    //window.location.reload(true)
  }

  const newInstrument = () => {
    navigate('/addInstrument')
  }



  return (
    <>
      {/* Display table with instruments, limit number visible at first? */}
      <div>
        <h1>
          <FaClipboardList />Inventory
        </h1>
      </div>
      <div className='inventoryTable mt-5'>
        <h2>Instruments</h2>
        <Table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Make</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Assigned to:</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((inst, id) => (
              <tr key={id}>
                <td>{inst.type}</td>
                <td>{inst.make}</td>
                <td>{inst.model}</td>
                <td>{inst.serialNumber}</td>
                <td>{inst.assignedTo.map(item => item.studentAssigned)}</td>
                <td>{inst.damageNotes}</td>
                <td><Button variant="success" active className='btn' onClick={() => { itemDisplay(inst) }}>Inspect</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Button variant="primary" active className='btn' onClick={newInstrument}>Add New</Button>
      </div>
      {/* Modal to display instrument details */}
      <div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Instrument Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Type: {itemDetail.type}</p>
            <p>Make: {itemDetail.make}</p>
            <p>Model: {itemDetail.model}</p>
            <p>Serial No.: {itemDetail.serialNumber}</p>
            <p>Notes: {itemDetail.damageNotes}</p>
            <p>Assigned to: {(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => item.studentAssigned) : null}</p>
            <p>Date Out: {(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => new Date(item.dateOut).toLocaleDateString()) : null}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="success" onClick={() => { updateItemModal() }}>Update</Button>
            <Button variant="danger" onClick={() => {
              removeItem()
              handleClose()
            }}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Additional modal to edit instrument details. Admin only. */}
      <div>
        <Modal show={editModal}>
          <Modal.Header>
            <Modal.Title>Update Instrument</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Instrument Type: </Form.Label>
                <Form.Control type="text" name="type" value={updatedItem.type} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="make">
                <Form.Label>Make: {updatedItem.make}</Form.Label>
                <Form.Control type="text" name="make" value={updatedItem.make} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="model">
                <Form.Label>Model: </Form.Label>
                <Form.Control type="text" name="model" value={updatedItem.model} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="serialNumber">
                <Form.Label>Serial Number: </Form.Label>
                <Form.Control type="text" name="serialNumber" value={updatedItem.serialNumber} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="schoolNumber">
                <Form.Label>School Number: </Form.Label>
                <Form.Control type="text" name="schoolNumber" value={updatedItem.schoolNumber} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="assignedTo">
                <Form.Label>Assigned to:  </Form.Label>
                <Form.Control type="text" name="assignedTo" value={(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => item.studentAssigned) : null} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateOut">
                <Form.Label>Date Out: {(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => new Date(item.dateOut).toLocaleDateString()) : null}</Form.Label>
                <Form.Control type="datetime-local" name="dateOut" value={(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => new Date(item.dateOut).toISO) : null} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateIn">
                <Form.Label>Date In: {(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => new Date(item.dateIn).toLocaleDateString()) : null}</Form.Label>
                <Form.Control type="datetime-local" name="dateIn" value={(itemDetail.assignedTo) ? itemDetail.assignedTo.map(item => new Date(item.dateIn).toLocaleDateString()) : null} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="damageNotes">
                <Form.Label>Notes: </Form.Label>
                <Form.Control type="text" name="damageNotes" value={updatedItem.damageNotes} onChange={onChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" active onClick={() => { setEditModal(false) }}>Cancel</Button>
            <Button variant="success" type="submit" active onClick={() => { editItem() }} >Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Inventory;