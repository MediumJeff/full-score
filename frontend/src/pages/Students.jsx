import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { FaSchool } from 'react-icons/fa';

const Students = () => {
  return (
    <>
      <div>
        <h1>
          <FaSchool /> Students
        </h1>
      </div>
      <div>

      </div>
    </>
  )
}

export default Students;