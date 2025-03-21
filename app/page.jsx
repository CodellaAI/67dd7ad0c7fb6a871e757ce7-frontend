
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post(`${process.env.API_URL}/log`, {
        action: 'button_clicked',
        timestamp: new Date()
      });
      
      setMessage('Successfully logged click to database!');
    } catch (error) {
      console.error('Error logging click:', error);
      setMessage('Error logging click. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Simple Click Logger</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <p className="text-gray-600 mb-6 text-center">
            Click the button below to log an entry to MongoDB
          </p>
          
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging...' : 'Log Click to Database'}
          </button>
          
          {message && (
            <div className={`mt-4 p-3 rounded-md text-center ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
