import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InboundEdit() {
    const [payload, setPayload] =useState({
        stuff_id: null,
        total: null,
        date: null,
        proff_file: null
    });

    const [ stuffs, setStuffs] = useState({})
    const [ error, setError] = useState({})
    const [ alert, setAlert] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/stuff', {
            headers:  {
                'Authorization': ' Bearer' + localStorage.getItem('access_token'),
        }
    })
        .then(res => {
            setStuffs(res.data.data);
            setPayload(res.data.data);
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, []);

    function handleInputFileChange(e) {
        const {name, files} = e.target;
        setPayload(prevPayload => ({
            ...prevPayload,
            [name]: files[0]
        }));
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        console.log(payload)
        axios.patch('http://localhost:8000/InboundStuff/id', payload, {
            headers:  {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            setError({});
            setAlert(true)
        })
        .catch(err => {
            if (err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                setError(err.response.data);
                console.log(err.response.data)
            }
        })
    }

    // const handleEditInbound = (event) => {
    //     event.preventDefault();

    //     instance.patch(/InboundStuff/${id}, payload)
    //     .then(res => {
    //         navigate('/inbound');
    //     })
    //     .catch(errr => {
    //         setError(err.response.data.data)
    //         console.log(err.response)
    //     })
    // }

    return (
        <Case>
                    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-white dark:text-white">Add a new Inbound Stuff Data</h2>
                {
                    alert ? (
                        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark-bg:bg-gray-800 dark:text-green-400" role="alert">
                            <span class="font-medium">Success!</span> Check inbound data in <b><Link>this page</Link></b>
                        </div>
                    ) : ''
                }
                <form onSubmit={handleSubmitForm} class="max-w-sm mx-auto">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div>
                            <label for="stuff_id" class="block mb-2 text-sm font-medium text-white dark:text-white">Stuff</label>
                            <select id="stuff"  name="stuff_id" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setPayload({...payload, stuff_id: e.target.value})}>
                                <option hidden disabled selected>Select Stuff</option>
                                {
                                    Object.entries(stuffs).map(([index, item]) => (
                                        <option key={index} value={item.id} defaultValue={payload.stuff_id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label for="total" class="block mb-2 text-sm font-medium text-white dark:text-white">Total Stuff</label>
                            <input type="number" name="total" id="total" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required defaultValue={payload.total} onChange={e => setPayload({...payload, total: e.target.value})} />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="date" class="block mb-2 text-sm font-medium text-white dark:text-white">Date</label>
                            <input type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required defaultValue={payload.date} onChange={e => setPayload({...payload, date: e.target.value})} />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="proff_file" class="block mb-2 text-sm font-medium text-white dark:text-white">Proff File</label>
                            <input type="file" name="proff_file" id="proff_file" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required defaultValue={payload.proff_file} onChange={handleInputFileChange} />
                        </div>
                    </div>
                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add Inbound
                    </button>
                </form>
                    </div>
                
        </Case>
    )
}