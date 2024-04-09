import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
// console.log(process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'niktestpython@gmail.com', 
    pass: process.env.EMAIL_PASSWORD,
  }
});
app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

let allOrders = [];

// Load existing orders
(async () => {
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    allOrders = JSON.parse(orders);
  } catch (error) {
    console.error('Error loading orders:', error);
  }
})();

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  // Generate new order ID
  const maxOrderId = allOrders.reduce((maxId, order) => Math.max(maxId, parseInt(order.id)), 0);
  const newOrderId = (maxOrderId + 1).toString();

  // Create new order object
  const newOrder = {
    id: newOrderId,
    itemsOrdered: orderData.itemsOrdered,
    customer: orderData.customer,
  };
  console.log(newOrder);

  // Add the new order to the list
  allOrders.push(newOrder);

  try {
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    console.log("Order written to file.");
    // Respond with success message
    res.status(201).json({ message: 'Order created!', order: newOrder });
  } catch (error) {
    console.error('Error writing orders to file:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'niktestpython@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: 'Email sent successfully!' });
    }
  });
});
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
