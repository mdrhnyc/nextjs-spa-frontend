import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', gap: '15px' }}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/bookings">View Bookings</Link>
                </li>
                <li>
                    <Link href="/booking/create">Create Booking</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
