import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../features/calendar/calendarSlice";
import Spinner from '../components/Spinner';

function Calendar() {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: new Date(),
        startTime: '',
        endTime: '',
        location: ''
    })

    const { eventName, eventDate, startTime, endTime, location } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess) {
            navigate('/calendar')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    
}

    