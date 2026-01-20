const express = require('express');
const app = express();

app.use(express.json());

const users = new Map();

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'User service is healthy',
        Timestamp: new Date().toISOString(),
        services: 'users',
        version: '1.0.0'
    });
});

app.post('/users', (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        }); 
    }

    const userId = `user-${Date.now()}`;
    const user = { userId, name, email, phone,
    createdAt: new Date().toISOString() };
    users.set(userId, user);
    
    res.status(201).json(user);
});

// Get user profile
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.get(id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

//List all users
app.get('/users', (req, res) => {
    const userList = Array.from(users.values());
    res.status(200).json({ count: userList.length, users: userList });
});

//Update user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.get(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const updated = { ...user, ...req.body, userId: Id};
    users.set(id, updated);
    res.status(200).json(updated);
});

//Delete User
const PORT = process.env.PORT || 3002;
app.listen (PORT, '0.0.0.0', () => {
    console.log(`User service running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || `development`}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
});


