import { FaClipboardList } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap" ;
import { toast } from 'react-toastify';
import { getInstrument, deleteInstrument, updateInstrument, reset } from '../features/inventory/inventorySlice';


const Inventory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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


  return (
    <>
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
              <tr data-index={id}>
                <td>{inst.type}</td>
                <td>{inst.make}</td>
                <td>{inst.model}</td>
                <td>{inst.serialNumber}</td>
                <td>{inst.assignedTo.map(item => item.studentAssigned)}</td>
                <td>{inst.damageNotes}</td>
                <td><Button variant="success" active className='btn'>Inspect</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Button variant="primary" active className='btn'>Add New</Button>
      </div>
    </>
  )
}

export default Inventory;