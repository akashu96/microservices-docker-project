const express = require('express');
const app = express();

app.use(express.json());

//notification store
const notifications = [];

//Health check
app.get('/health', (req, res) => {
    res.status(200).json ({
        status: 'Notification Service is healthy',
        timestamp: new Date(),
        service: 'Notification Service',
        version: '1.0.0'
    });
});

//send notification
app.post('/notifications', (req, res) => {
    const { userId, type, message, channel } = req.body;
    if (!userId || !type || !message ) {
        return res.status(400).json({ error: 'userId, type, and message are required' });
    }

    const notification = {
        id: `NOTIF-${Date.now()}`,
        userId,
        type,
        message,
        channel: channel || 'email',
        status: 'sent',
        timestamp: new Date()
    };

    notifications.push(notification);
    res.status(201).json({ notification });
});

// Get notifications for user
app.get('/notifications/:userId', (req, res) => {
  const { userId } = req.params;
  const userNotifications = notifications.filter(n => n.userId === userId);

  res.status(200).json({
    userId,
    count: userNotifications.length,
    notifications: userNotifications
  });
});

// Get all notifications
app.get('/notifications', (req, res) => {
  res.status(200).json({
    total: notifications.length,
    notifications
  });
});

// Mark notification as read
app.patch('/notifications/:id', (req, res) => {
  const { id } = req.params;
  const notification = notifications.find(n => n.id === id);

  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }

  notification.status = 'read';
  res.status(200).json(notification);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Notification service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
});