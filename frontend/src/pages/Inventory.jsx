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

  const [itemDetail, setItemDetail] = useState([])
  const [show, setShow] = useState(false)

  const itemDisplay = (e) => {
    setItemDetail(e)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

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
        <Button variant="primary" active className='btn'>Add New</Button>
      </div>
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
            <p>Assigned to: {}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Inventory;