import { dbConnect } from '../../config/dbConnect';
import User from '../../models/User';

let lastOrderId = 1;  // 初始化一个初始的订单ID

export default async function handler(req, res) {
  await dbConnect();  // 确保连接到数据库

  if (req.method === 'GET') {
    // 获取所有用户
    try {
      const users = await User.find();
      res.status(200).json(users); 
    } 
    catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } 
  else if (req.method === 'POST') {
    // 添加新用户
    const { name, age } = req.body;

    try {
      const newUser = await User.create({ name, age, orders: [] });  
      res.status(201).json({ message: 'User created', user: newUser });
    } 
    catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } 
  else if (req.method === 'PUT') {
    // 为指定用户添加订单
    const { userId, product } = req.body;

    try {
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // 自动生成订单ID（此处使用简单自增方式）
      const orderId = lastOrderId++;
      user.orders.push({ order_id: orderId, product }); 
      await user.save(); 
      res.status(200).json({ message: 'Order added', user });
    } 
    catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({ error: 'Failed to add order' });
    }
  } 
  else {
    res.status(405).json({ error: 'Method not allowed' });  // 不允许其他HTTP方法
  }
}
