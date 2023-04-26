import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createInstrument, reset } from '../features/inventory/inventorySlice';
import Spinner from '../components/Spinner';


function AddInstrument() {

  // Create state for form information based on schema in backend model
  const [instrumentData, setInstrumentData] = useState({
    type: '',
    make: '',
    model: '',
    serialNumber: '',
    schoolNumber: '',
    studentAssigned: '',
    damageNotes: ''
  })

  const { type, make, model, serialNumber, schoolNumber, studentAssigned, damageNotes } = instrumentData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get user info from state to verify admin status
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isSuccess, isError, message, navigate, dispatch])

  // Store form data and send to MongoAtlas
  const onChange = (e) => {
    setInstrumentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!user.admin) {
      toast.error('Must have admin account to add inventory files')

    } else {
      dispatch(createInstrument(instrumentData))
      navigate('/inventory')
      console.log(instrumentData)
    }
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>Add new instrument</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="type" name="type" value={type} placeholder='Enter the type of instrument' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="make" name="make" value={make} placeholder='Enter the make of the instrument' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="model" name="model" value={model} placeholder='Enter the model of the instrument' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="serialNumber" name="serialNumber" value={serialNumber} placeholder='Please enter the serial number of the instrument' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="schoolNumber" name="schoolNumber" value={schoolNumber} placeholder='Enter the school inventory number (optional)' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="studentAssigned" name="studentAssigned" value={studentAssigned} placeholder='Student assigned' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="damageNotes" name="damageNotes" value={damageNotes} placeholder='Notes on condition, accessories' onChange={onChange} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddInstrument;