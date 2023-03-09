import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";



function Dashboard() {

  const navigate = useNavigate()

  const { user } = useSelector(
    (state) => state.auth
    )
  

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
    <div>Dashboard</div>
    <div>
      {user ? (
        <p>Welcome {user.firstName} {user.lastName}</p>
      ) : 
      null
      }
    </div>
    <div>
      <Calendar />
    </div>
    </>
  )
}

export default Dashboard;