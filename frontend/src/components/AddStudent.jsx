import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { createStudent, reset } from '../features/students/studentSlice';


function AddStudent() {

  // Create state for form information based on schema in backend model
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    gradeLevel: '',
    ensembles: [],
    instruments: [],
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    phone: ''
  })

  const { firstName, lastName, studentId, gradeLevel, ensembles, instruments, email, address, phone } = studentData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get user info from state to verify admin status
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/students')
    }

    dispatch(reset())
  }, [user, isSuccess, isError, message, navigate, dispatch])

  // Store form data and send to MongoAtlas
  const onChange = (e) => {
    setStudentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!user.admin) {
      toast.error('Must have admin account to add student')
    } else {
      dispatch(createStudent(studentData))
      navigate('/')
    }
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>Add student</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} placeholder='First name' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} placeholder='Last name' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="studentId" name="studentId" value={studentId} placeholder='Student ID number' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="gradeLevel" name="gradeLevel" value={gradeLevel} placeholder='Current grade level' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="email" name="email" value={email} placeholder='School email address' onChange={onChange} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddStudent;