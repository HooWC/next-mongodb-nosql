import Link from 'next/link';
import { useUsers } from '../hooks/useUsers';

export default function Home() {

  const {
    name,
    setName,
    age,
    setAge,
    handleUserSubmit,
  } = useUsers(); 

  return (
    <div className="container">
      <h1 className="title">添加新用户</h1>
      <form onSubmit={handleUserSubmit} className="form-container">
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="年龄"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">添加用户</button>
      </form>

      <div className="link-container">
        <h2>查看所有用户</h2>
        <Link href="/views/viewUsers" className="view-users-link">
          查看用户和添加订单
        </Link>
      </div>
    </div>
  );
}
