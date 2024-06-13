import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function StuffEdit() {
    const [forms, setForms] =useState({
        name: '',
        category: ''
    })

    const params = useParams()
    const id = params.id

    const [ error, setError] = useState([])

    const navigate = useNavigate()

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:  {
            'Authorization': ' Bearer' + localStorage.getItem('access_token'),
        }
    })

    useEffect(() => {
        instance.delete(`/stuff/${id}`)
        .then(res => {
            setForms(res.data.data);
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleDeleteStuff = (event) => {
        event.preventDefault();

        instance.patch(`/stuff/${id}`, forms)
        .then(res => {
            navigate('/stuff');
        })
        .catch(errr => {
            setError(err.response.data.data)
            console.log(err.response)
        })
    }
    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            Object.entries(error).map(([key, value], i) => (
                                                <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                    </div>
                </div>
            </div>
        </Case>
    )
}
