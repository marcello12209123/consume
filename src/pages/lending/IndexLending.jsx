import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Lending() {
    const [lendings, setLendings] = useState([])

    const navigate = useNavigate()

    const [error, setError] = useState([])
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);
    const location = useLocation();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    useEffect(() => {
        instance.get('lendings', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLendings(res.data.data);
                setIsLogin(true);
                setAuthUser(res.data.data);
                if (location.pathname === '/login') {
                    navigate('/profile');
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
                }
                setIsLogin(false);
                if (err.response.status === 401 && location.pathname !== '/login') {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!!!'));            
                }
            })
    }, [navigate, location.pathname]);

    // const deleteLending = (id) => {
    //     instance.delete(le/${id})
    //     .then(res => {
    //         setStuffs(stuffs.filter(stuff => stuff.id !== id));
    //     })
    //     .catch(err => {
    //         setError(err.response.data);
    //     });
    // };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {
                        isLogin ? authUser['role'] === 'admin' ? (
                            <>
                            <div className="flex justify-between">
                                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                                <Link to='create' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                                    Trash
                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                </Link>
                            </div>
                            </>
                        ) : (
                            <div className="flex justify-between">
                                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                                <Link to='create' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                                    Tambah
                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                </Link>
                            </div>
                        ) : ''
                    }
                    {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            error.message
                                            // Object.entries(error).map(([key, value], i) => (
                                            // <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            // ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">User</th>
                                    <th scope="col" className="px-6 py-4">Stuff-id</th>
                                    <th scope="col" className="px-6 py-4">User-id</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lendings.map((lending, id) => (
                                    <tr key={lending.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.stuff ? lending.stuff.name : ''}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.user_id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.date_time}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.total_stuff}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.notes}</td>
                                        {/* {
                                            stuff.stock ? (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Total Available: {stuff.stock.total_available} <br />
                                                    Total Defect: {stuff.stock.total_defect} <br />
                                                </td>
                                            ) : (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Stock Belum Ditambahkan
                                                </td>
                                            )
                                        } */}
                                        {/* <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={'/stuff/edit/' + stuff.id} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Edit</Link>
                                            <button type="button" onClick={() => deleteStuff(stuff.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>    
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    )
}