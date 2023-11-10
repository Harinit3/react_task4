import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        console.log('API Response:', response.data); 
    
        if (Array.isArray(response.data)) {
          setUsers(response.data); 
        } else if (typeof response.data === 'object' && response.data !== null) {
          if (Array.isArray(response.data.users) && response.data.users.length > 0) {
            const firstObject = response.data.users[0];
            console.log('First Object Structure:', Object.keys(firstObject));
          }
    
          const dataArray = response.data.users; 
          if (Array.isArray(dataArray)) {
            setUsers(dataArray);
          } else {
            console.error('Invalid data structure. Expected an array.');
            setError('Invalid data structure. Please check the API.');
          }
        } else {
          console.error('Invalid data structure. Expected an array or an object with an array.');
          setError('Invalid data structure. Please check the API.');
        }
    
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.'); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  return (
    <div>
      <h2>User Table</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Username</th>
              <th>Domain</th>
              <th>IP</th>
              <th>University</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
        
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.domain}</td>
                  <td>{user.ip}</td>
                  <td>{user.university}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default UserTable;