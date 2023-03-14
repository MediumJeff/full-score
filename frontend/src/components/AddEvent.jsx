import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEvent, getEvent, reset } from '../features/calendar/calendarSlice';
import Spinner from '../components/Spinner';


function AddEvent() {

  const [calendarData, setCalendarData] = useState({
    title: '',
    start: Date.toISOString,
    end: Date.toISOString,
    location: '',
    notes: ''
  })

  const { title, start, end, location, notes } = calendarData
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const onChange = (e) => {
    setCalendarData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!user.admin) {
      toast.error('Must have admin account to alter calendar')
    } else {
      dispatch(reset())
    }

    dispatch(createEvent(calendarData))
    dispatch(getEvent())
    navigate('/')
    console.log(calendarData)
    }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Add new event</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="title" name="title" value={title} placeholder='Enter the title for the event' onChange={onChange} />
          </div>
          <div className="form-group">
          <label htmlFor="start">Enter the starting date and time</label>
            <input type="datetime-local" className="form-control" id="start" name="start" value={start} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="end">Enter the ending date and time</label>
            <input type="datetime-local" className="form-control" id="end" name="end" value={end} onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="location" name="location" value={location} placeholder='Please enter the location of the event' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="notes" name="notes" value={notes} placeholder='Additional information' onChange={onChange} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddEvent;