import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api-travell-app-1.onrender.com/admin/');
        const admins = response.data.map(admin => ({
            username: admin.username,
            password: admin.password
        }));
        res.render('userAdmin', { admins });
    } catch (error) {
        console.error('Error fetching admin list:', error);
        res.render('userAdmin', { admins: [] });
    }
});

export default router;
