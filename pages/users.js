import React, { useEffect, useState } from 'react';
import Mcq from './components/mcq';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/getUsers');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.slice(0, 10)); // Get only the latest 10 records
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Users</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>FIRST NAME</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>LAST NAME</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>EMAIL</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>GENDER</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>DATE OF BIRTH</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={prompt.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.first_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.last_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                   {user.email}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {user.gender}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {user.date_of_birth}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {user.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Mcq/>
    </div>


  );
};

export default UsersPage;