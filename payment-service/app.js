const express = require('express');
const app = express();

app.use(express.json());

//Health check endpoint
app.get ('/health', (req, res) => {
    res.status(200).json ({
        status: 'Payment Service is healthy',
        timestamp: new Date().toISOString(),
        service: 'payment',
        version: '1.0.0'
    });
});

//Process payment endpoint
app.post ('/pay', (req, res) => {
    const { amount, currency, customerId } = req.body;

    if(!amount || !currency || !customerId) {
        return res.status(400).json({
            error: 'Missing required payment information'   
        });
    }

    // Simulate payment processing
    const transactionId = `TXN-${Date.now()}`;
    res.status(200).json({
        success: true,
        transactionId,
        amount,
        currency,
        customerId,
        timestamp: new Date(),
        message: 'Payment processed successfully'
    });
});

// Get Transaction Status endpoint
app.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        transactionId: id,
        status: 'Completed',
        amount: 100,
        currency: 'USD',
        timestamp: new Date()
    });
});

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () =>{
    console.log(`Payment Service is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`TimeStamp: ${new Date().toISOString()}`);
});