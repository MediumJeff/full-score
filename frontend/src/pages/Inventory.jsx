import { FaClipboardList } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
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
}, [ user, isError, isSuccess, message, dispatch, navigate])

  return (
    <>
      <div>
        <h1>
          <FaClipboardList />Inventory
        </h1>
      </div>
      <div className='inventoryTable'>
        <p>{instruments.type}</p>
      </div>
    </>
  )
}

export default Inventory;