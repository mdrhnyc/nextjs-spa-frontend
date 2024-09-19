"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateBooking() {
    const [services, setServices] = useState([]);
    const [providers, setProviders] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [price, setPrice] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');  // Add email state
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Fetch services and service providers from API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/services/')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));

        axios.get('http://127.0.0.1:8000/api/service-providers/')
            .then(response => setProviders(response.data))
            .catch(error => console.error('Error fetching service providers:', error));
    }, []);

    // Handle service selection to update the price
    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        const selected = services.find(service => service.id === parseInt(serviceId));
        setSelectedService(serviceId);
        setPrice(selected ? selected.price : '');
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!selectedService || !selectedProvider || !selectedDate || !selectedTime || !firstName || !lastName || !email) {
            setMessage('Please fill out all fields.');
            return;
        }

        // Prepare the form data
        const formData = {
            service: selectedService,
            service_provider: selectedProvider,
            date: selectedDate,
            time: selectedTime,
            customer_first_name: firstName,
            customer_last_name: lastName,
            customer_email: email  // Include email in the payload
        };

        try {
            // Submit the form data to the API
            await axios.post('http://127.0.0.1:8000/api/booking/', formData);
            setMessage('Booking created successfully!');
            // Redirect to the bookings page after successful creation
            router.push('/bookings');
        } catch (error) {
            console.error('Error creating booking:', error);
            setMessage('Error creating booking. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create a Booking</h1>
            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                {/* Customer First Name */}
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </div>

                {/* Customer Last Name */}
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </div>

                {/* Customer Email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Service Selection */}
                <div>
                    <label htmlFor="service">Service:</label>
                    <select id="service" value={selectedService} onChange={handleServiceChange}>
                        <option value="">Select a service</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Service Price */}
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" value={price} readOnly />
                </div>

                {/* Date Picker */}
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                    />
                </div>

                {/* Time Picker */}
                <div>
                    <label htmlFor="time">Time:</label>
                    <select
                        id="time"
                        value={selectedTime}
                        onChange={e => setSelectedTime(e.target.value)}
                    >
                        <option value="">Select a time</option>
                        {/* Generate options for time */}
                        {['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'].map(time => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Service Provider Selection */}
                <div>
                    <label htmlFor="provider">Service Provider:</label>
                    <select
                        id="provider"
                        value={selectedProvider}
                        onChange={e => setSelectedProvider(e.target.value)}
                    >
                        <option value="">Select a service provider</option>
                        {providers.map(provider => (
                            <option key={provider.id} value={provider.id}>
                                {provider.first_name} {provider.last_name} ({provider.gender})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
}
