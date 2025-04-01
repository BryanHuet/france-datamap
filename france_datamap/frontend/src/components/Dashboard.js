import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line } from 'recharts';
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/dashboard/')  // Modifie l'URL selon ton setup
            .then(response => response.json())
            .then(data => {
                setBarData(data.barData);
                setPieData(data.pieData);
                setLineData(data.lineData);
                setMarkers(data.markers);
                setStats(data.stats);
                setLoading(false);
            })
            .catch(error => console.error('Erreur de chargement des données:', error));
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Tableau de bord</h1>

            {/* Statistiques Cards */}
            <div className="stats-container">
                {stats.map(stat => (
                    <div key={stat.id} className="stat-card">
                        <h3 className="stat-title">{stat.title}</h3>
                        <div className="stat-value">{stat.value}</div>
                        <div className={`stat-change ${stat.status}`}>
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Conteneur de graphiques principaux */}
            <div className="main-charts">
                <div className="chart-container large">
                    <h3>Activités utilisateurs</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Carte Leaflet */}
                <div className="map-container">
                    <h3>Distribution géographique</h3>
                    <div className="leaflet-container">
                        <MapContainer center={[48.8566, 2.3522]} zoom={5} style={{ height: '100%', width: '100%', borderRadius: '8px' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {markers.map((marker, idx) => (
                                <Marker key={idx} position={marker.position}>
                                    <Popup>
                                        <b>{marker.name}</b><br />
                                        {marker.users} utilisateurs actifs
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>

            {/* Graphiques secondaires */}
            <div className="secondary-charts">
                <div className="chart-container small">
                    <h3>Répartition</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container small">
                    <h3>Activité hebdomadaire</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
