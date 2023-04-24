import { FaClipboardList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
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
    dispatch(deleteInstrument(updatedItem._id))
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
    dispatch(updateInstrument({ id: updatedItem._id, itemDetail: updatedItem }))
    setEditModal(false)
    window.location.reload(true)
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
            <Button variant="success" onClick={() => { editModal() }}>Update</Button>
            <Button variant="danger" onClick={() => {
              removeItem()
              handleClose()
            }}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Inventory;