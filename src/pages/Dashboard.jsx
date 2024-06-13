import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
    const [stuffs, setStuffs] = useState([]);
    const [lendings, setLendings] = useState([]);
    const [users, setUsers] = useState([]);
    const [checkProses, setCheckProses] = useState(false);
    const [lendingGrouped, setLendingGrouped] = useState([]);
    const [selectedStuffId, setSelectedStuffId] = useState("");
    const [profile, setProfile] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        getDataStuffs();
        getDataUsers();
        getDataLendings();
        getDataProfile();
    }, [checkProses, selectedStuffId, startDate, endDate]);

    const getDataStuffs = () => {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => setStuffs(res.data.data))
            .catch(handleError);
    };

    const getDataUsers = () => {
        axios.get('http://localhost:8000/user', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => setUsers(res.data.data))
            .catch(handleError);
    };

    const getDataLendings = () => {
        axios.get('http://localhost:8000/lendings', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                let data = res.data.data;

                if (selectedStuffId) {
                    data = data.filter(entry => entry.stuff_id === selectedStuffId);
                }

                data = data.filter(entry => {
                    const date = new Date(entry.date_time);
                    return date >= startDate && date <= endDate;
                });

                setLendings(data);

                const groupedData = {};
                data.forEach((entry) => {
                    const date = new Date(entry.date_time);
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                    groupedData[formattedDate] = groupedData[formattedDate] || 0;
                    groupedData[formattedDate] += entry.total_stuff;
                });

                const processedData = Object.keys(groupedData).map((date) => ({
                    date,
                    totalStuff: groupedData[date]
                }));

                setLendingGrouped(processedData);
                setCheckProses(true);
            })
            .catch(handleError);
    };

    const getDataProfile = () => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => setProfile(res.data.data))
            .catch(handleError);
    };

    const handleStuffChange = (event) => {
        setSelectedStuffId(event.target.value);
        setCheckProses(false);
    };

    const handleError = (err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
            navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
        }
    };

    const exportToCSV = () => {
        const csvData = lendings.map(entry => ({
            "Tanggal": entry.date_time,
            "Total Stuff": entry.total_stuff,
        }));

        const csvRows = [
            ["Tanggal", "Total Stuff"],
            ...csvData.map(row => [row["Tanggal"], row["Total Stuff"]])
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "data_peminjaman.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Case>
            <div className="mb-6 bg-indigo-500 text-white py-8 text-center shadow-md rounded-md">
                <h1 className="text-4xl font-bold drop-shadow-lg">SELAMAT DATANG DI DASHBOARD</h1>
                <h2 className="text-xl mt-2 drop-shadow-md">Anda masuk sebagai: {profile.username}</h2>
            </div>

            <div className="flex flex-wrap justify-center mx-4">
                <InfoCard title="Data Stuff" count={stuffs.length} icon="cube" />
                <InfoCard title="Data User" count={users.length} icon="users" />
                <InfoCard title="Data Lending" count={lendings.length} icon="handshake" />

                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <label className="mr-2">Mulai</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="border rounded-md p-2"
                            />
                            <label className="ml-4 mr-2">Sampai</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="border rounded-md p-2"
                            />
                        </div>
                        <button onClick={exportToCSV} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform hover:scale-105">
                            Export CSV
                        </button>
                    </div>
                </div>

                {checkProses && (
                    <div className="p-4 w-full">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={lendingGrouped} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalStuff" fill="#FBBF24" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </Case>
    );
}

const InfoCard = ({ title, count, icon }) => (
    <div className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
                <div className="w-14 h-14 mr-4 flex items-center justify-center rounded-full bg-yellow-500 text-white">
                    <FontAwesomeIcon icon={['fas', icon]} className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-medium">{title}</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <h1 className="text-2xl font-bold">{count}</h1>
            </div>
        </div>
    </div>
);
