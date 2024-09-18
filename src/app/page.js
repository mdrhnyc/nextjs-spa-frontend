"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/Layout';

export default function HomePage() {
    // State for services data and loading
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        // Fetch services from the Django API
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/services/');
                console.log(res);
                setServices(res.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchServices();
    }, []);

    // Render loader while fetching data
    if (loading) {
        return <Layout><div>Loading services...</div></Layout>;
    }

    return (
        <Layout>
            <h1>Available Services</h1>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        {service.name} - ${service.price} for {service.duration} minutes
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
