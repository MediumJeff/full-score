import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';



const EventDetails = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  

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