"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function BookingPage() {
    // State for booking data and loading
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Fetch bookings from the Django API
        const fetchBookings = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/bookings/');
                console.log(res);
                setBookings(res.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchBookings();
    }, []);

    const filterBookings = ((filterText) => {
        console.log(filterText);
        return bookings.filter(booking => {
            const bookingText = `${booking.service_name} ${booking.customer_first_name} ${booking.customer_last_name} ${booking.service_provider_first_name} ${booking.service_provider_last_name} ${booking.date} ${booking.time}`.toLowerCase();
            return bookingText.toLowerCase().includes(searchText.toLowerCase());
        });
    })

    const filterdBookings = filterBookings();
    

    // Render loader whlile fetching data
    if (loading) {
        return <Layout><div>Loading bookings...</div></Layout>;
    }

    return (
        <Layout>
            <h1>Bookings</h1>
            <input type='text' id='search-booking' className='search-booking-input' placeholder='Search booking' defaultValue={searchText} onKeyUp={((e) => {setSearchText(e.target.value); filterBookings(e.target.value)})} />
            <ul>
                {filterdBookings.map(booking => (
                    <li key={booking.id}>
                        {booking.service_name} - {booking.customer_first_name} {booking.customer_last_name} - {booking.service_provider_first_name} {booking.service_provider_last_name} - {booking.date} - {booking.time}
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
