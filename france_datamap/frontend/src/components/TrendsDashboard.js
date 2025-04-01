import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TrendsDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/trends/')
            .then(response => response.json())
            .then(data => {
                setBarData(data.barData);
                setLineData(data.lineData);
                setMarkers(data.markers);
                setStats(data.stats);
                setLoading(false);
            })
            .catch(error => console.error('Erreur de chargement des données:', error));
    }, []);

    if (loading) return <p>Chargement des données...</p>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Analyse des tendances X</h1>

            {/* KPI Cards */}
            <div className="stats-container">
                {stats.map(stat => (
                    <div key={stat.id} className="stat-card">
                        <h3 className="stat-title">{stat.title}</h3>
                        <div className="stat-value">{stat.value}</div>
                        <div className={`stat-change ${stat.status}`}>{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="main-charts">
                <div className="chart-container large">
                    <h3>Popularité mensuelle</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FF5733" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Map */}
                <div className="map-container">
                    <h3>Régions avec la tendance</h3>
                    <MapContainer center={[48.8566, 2.3522]} zoom={5} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {markers.map((marker, idx) => (
                            <Marker key={idx} position={marker.position}>
                                <Popup>
                                    <b>{marker.name}</b><br />
                                    {marker.mentions} mentions
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Line Chart */}
            <div className="chart-container small">
                <h3>Évolution hebdomadaire</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#FF5733" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrendsDashboard;