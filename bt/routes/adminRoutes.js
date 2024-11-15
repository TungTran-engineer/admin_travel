import express from 'express';
import axios from 'axios';

const adminRouter = express.Router();

// GET route for admin list
adminRouter.get('/', async (req, res) => {
    const q = req.query.q || '';

    try {
        const response = await axios.get('https://api-travell-app-1.onrender.com/admin/');
        let admins = response.data.map(admin => ({
            username: admin.username,
            password: admin.password
        }));

        if (q) {
            const regex = new RegExp(q, 'i');
            admins = admins.filter(admin => regex.test(admin.username));
        }

        res.render('userAdmin', { admins, q });
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.render('userAdmin', { admins: [], q });
    }
});

adminRouter.get('/login', (req, res) => {
    res.render('admin', { error: null }); // Render admin.ejs with no error initially
});

// POST route to handle login submissions
adminRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch admins data from the API
        const response = await axios.get('https://api-travell-app-1.onrender.com/admin/');
        const admins = response.data;

        // Check if the username and password match any admin
        const validAdmin = admins.find(
            admin => admin.username === username && admin.password === password
        );

        if (validAdmin) {
            // Successful login
            res.redirect('/dashboard'); // Replace with your admin dashboard route
        } else {
            // Invalid credentials
            res.render('admin', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.render('admin', { error: 'An error occurred during login. Please try again later.' });
    }
});


export default adminRouter;
