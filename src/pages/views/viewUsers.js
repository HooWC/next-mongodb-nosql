import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers'; 

export default function ViewUsers() {
  const {
    selectedUserId,
    setSelectedUserId,
    product,
    setProduct,
    handleAddOrder
  } = useUsers(); 
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);  
    }
    fetchUsers();
  }, []);

  return (
    <div className="container">
       <Link href="/" className="view-users-link">
          返回
        </Link>
      <h1 className="title">所有用户</h1>
      <div className="user-selection">
        <select
          onChange={(e) => setSelectedUserId(e.target.value)}
          value={selectedUserId}
          className="user-select"
        >
          <option value="">选择用户</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} (年龄: {user.age})
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && (
        <div className="user-details">
          <h3>订单信息</h3>
          <ul className="order-list">
            {users
              .find((user) => user._id === selectedUserId)
              .orders.map((order, index) => (
                <li key={index} className="order-item">
                  <strong>产品: </strong>{order.product}
                </li>
              ))}
          </ul>

          <form onSubmit={handleAddOrder} className="order-form">
            <input
              type="text"
              placeholder="产品"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
              className="order-input"
            />
            <button type="submit" className="order-button">添加订单</button>
          </form>
        </div>
      )}

      <h3>现有用户</h3>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            {user.name} (年龄: {user.age}) - 订单: {user.orders.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
