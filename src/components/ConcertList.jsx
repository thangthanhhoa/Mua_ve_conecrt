import React, { useState, useEffect } from 'react';
import { concertService } from '../services/concertService';

function ConcertList() {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                setLoading(true);
                const data = await concertService.getAllConcerts();
                setConcerts(data);
                setError(null);
            } catch (err) {
                setError('Không thể tải danh sách concert');
                console.error('Error fetching concerts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConcerts();
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Danh sách Concert</h2>
            <div className="concert-list">
                {concerts.map((concert) => (
                    <div key={concert.id} className="concert-item">
                        <h3>{concert.name}</h3>
                        <p>{concert.description}</p>
                        <p>Ngày: {new Date(concert.date).toLocaleDateString()}</p>
                        <p>Giá: {concert.price} VNĐ</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConcertList; 