import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  orders: [
    {
      order_id: { type: Number, required: true },
      product: { type: String, required: true },
    },
  ],
});

const User = models.User || model('User', userSchema);

export default User;
