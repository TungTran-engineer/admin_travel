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



export default adminRouter;
