import { useState } from 'react';

export function useUsers() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [product, setProduct] = useState('');

  // 添加新用户
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        age: parseInt(age) 
      })
    });

    const data = await response.json();
    if (data.message === 'User created') {
      alert('User created successfully');
      setName('');
      setAge('');

      // 获取更新后的用户列表
      const updatedUsers = await fetch('/api/users').then((res) => res.json());
      setUsers(updatedUsers);
    } else {
      alert('Failed to create user');
    }
  };

  // 为用户添加订单
  const handleAddOrder = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: selectedUserId,
        product,
      })
    });

    const data = await response.json();
    if (data.message === 'Order added') {
      alert('Order added successfully');
      
      // 获取更新后的用户列表
      const updatedUsers = await fetch('/api/users').then((res) => res.json());
      setUsers(updatedUsers);
    } else {
      alert('Failed to add order');
    }
  };

  return {
    users,
    name,
    setName,
    age,
    setAge,
    selectedUserId,
    setSelectedUserId,
    product,
    setProduct,
    handleUserSubmit,
    handleAddOrder,
  };
}
