import { useState } from 'react'
import Title from './components/Title'
import Card from './components/Card'
import Case from './components/Case'

export default function App() {
  return (
    <Case>
    <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
            <h4 className='text-white text-2xl'>Consume API</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>A API_Lumen & React library for building user interfaces</p>
          <Card judul="Inventaris App React" sponsor="SMK Wikrama Bogor" />
          <Title name="Marcello i.L" date="04/06/2024" />
        </div>
    </div>
    </Case>
  )
}