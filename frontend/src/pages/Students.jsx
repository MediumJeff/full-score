import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { FaSchool } from 'react-icons/fa';
import { getStudent, reset } from '../features/students/studentSlice';

const Students = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load information for instrument inventory
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
  const { students } = useSelector((state) => state.students)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/students')
    }
    dispatch(getStudent())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const newStudent = () => {
    navigate('/addStudent')
  }

  return (
    <>
      <div>
        <h1>
          <FaSchool /> Students
        </h1>
      </div>
      <div className='inventoryTable mt-5'>
        <h2>Roster</h2>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Student ID</th>
              <th>Grade Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((stnt, id) => (
              <tr key={id}>
                <td>{stnt.firstName}</td>
                <td>{stnt.lastName}</td>
                <td>{stnt.studentId}</td>
                <td>{stnt.gradeLevel}</td>
                <td><Button variant="success" active className='btn'>Inspect</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Button variant="primary" active className='btn' onClick={newStudent}>Add Student</Button>
      </div>
    </>
  )
}

export default Students;