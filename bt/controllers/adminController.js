// adminController.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api-travell-app-1.onrender.com/admin/');
        res.render('admin', { admins: response.data });
    } catch (error) {
        console.error('Error fetching admin list:', error);
        res.render('admin', { admins: [] });
    }
});



export default router;
