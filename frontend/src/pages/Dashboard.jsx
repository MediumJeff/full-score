import { useSelector } from "react-redux";


function Dashboard() {

  const { user } = useSelector(
    (state) => state.auth
    )

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
    </>
  )
}

export default Dashboard;