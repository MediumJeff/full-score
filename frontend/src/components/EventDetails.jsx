import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';



const EventDetails = (props) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(props)
  return (
    <>
      <div>
        Update Event
      </div>
      <Button variant="primary" active onClick={() => navigate('/')}>Cancel</Button>
    </>
  )
}

export default EventDetails