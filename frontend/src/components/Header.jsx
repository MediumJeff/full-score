import { FaSignInAlt, FaSignOutAlt, FaUser, FaCalendarAlt, FaSchool, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Full Score</Link>
            </div>
            <ul>
                {user && user.admin ? (
                    <>
                        <li>
                            <Link to='/students'>
                                <FaSchool /> Students
                            </Link>
                        </li>
                        <li>
                            <Link to='/inventory'>
                                <FaClipboardList /> Inventory
                            </Link>
                        </li>
                        <li>
                            <Link to='/calendar'>
                                <FaCalendarAlt /> Calendar
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : 
                    (<>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                        <li>
                            <Link to='/calendar'>
                                <FaCalendarAlt /> Calendar
                            </Link>
                        </li>
                    </>)}

            </ul>
        </header>
    )
}

export default Header;