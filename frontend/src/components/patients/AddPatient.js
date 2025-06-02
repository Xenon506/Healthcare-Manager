import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    personalInfo: {
      name: { first: '', last: '' },
      age: '',
      gender: '',
      dob: '',
      contact: {
        phone: '',
        email: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        }
      }
    },
    allergies: [],
    medicalHistory: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 1) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        keys.forEach((key, i) => {
          if (i === keys.length - 1) {
            current[key] = value;
          } else {
            current[key] = current[key] || {};
            current = current[key];
          }
        });
        return newData;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/patients', formData);
      navigate('/patients');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add patient');
    }
  };

  return (
    <Container>
      <h2>Add New Patient</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Form fields would go here */}
        <Button variant="primary" type="submit">Add Patient</Button>
      </Form>
    </Container>
  );
};

export default AddPatient;
