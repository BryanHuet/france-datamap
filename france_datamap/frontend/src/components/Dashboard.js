import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line } from 'recharts';
import L from 'leaflet';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
    // Données pour les graphiques
    const barData = [
        { name: 'Jan', value: 400 },
        { name: 'Fév', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Avr', value: 800 },
        { name: 'Mai', value: 500 },
        { name: 'Jun', value: 700 },
    ];

    const pieData = [
        { name: 'Groupe A', value: 400 },
        { name: 'Groupe B', value: 300 },
        { name: 'Groupe C', value: 300 },
        { name: 'Groupe D', value: 200 },
    ];

    const lineData = [
        { name: 'Lun', value: 20 },
        { name: 'Mar', value: 30 },
        { name: 'Mer', value: 25 },
        { name: 'Jeu', value: 40 },
        { name: 'Ven', value: 35 },
        { name: 'Sam', value: 50 },
        { name: 'Dim', value: 45 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Données pour la carte
    const position = [48.8566, 2.3522]; // Paris
    const markers = [
        { position: [48.8566, 2.3522], name: 'Paris', users: 1254 },
        { position: [45.7640, 4.8357], name: 'Lyon', users: 876 },
        { position: [43.2965, 5.3698], name: 'Marseille', users: 943 },
        { position: [43.6047, 1.4442], name: 'Toulouse', users: 621 },
    ];

    const [stats, setStats] = useState([
        { id: 1, title: 'Utilisateurs actifs', value: '3,694', change: '+12%', status: 'positive' },
        { id: 2, title: 'Sessions', value: '8,451', change: '+5.2%', status: 'positive' },
        { id: 3, title: 'Taux de rebond', value: '32.8%', change: '-3.1%', status: 'positive' },
        { id: 4, title: 'Temps moyen', value: '4m 12s', change: '+0.5%', status: 'neutral' },
    ]);

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
                        <MapContainer
                            center={position}
                            zoom={5}
                            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                        >
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
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
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

                <div className="chart-container small">
                    <h3>Nouveaux Événements</h3>
                    <div className="events-list">
                        <div className="event">
                            <div className="event-badge success"></div>
                            <div className="event-details">
                                <div className="event-title">Nouveau client</div>
                                <div className="event-time">Il y a 5 min</div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="event-badge warning"></div>
                            <div className="event-details">
                                <div className="event-title">Alerte serveur</div>
                                <div className="event-time">Il y a 12 min</div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="event-badge info"></div>
                            <div className="event-details">
                                <div className="event-title">Mise à jour</div>
                                <div className="event-time">Il y a 25 min</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;