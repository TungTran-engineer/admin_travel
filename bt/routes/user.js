import express from 'express';
import axios from 'axios';
import User from '../models/user.js';


const userRouter = express.Router();

// GET route for user list
userRouter.get('/', async (req, res) => {
    const q = req.query.q || '';

    try {
        const response = await axios.get('https://api-travell-app-1.onrender.com/user/dss/');
        let users = response.data;

        if (q) {
            const regex = new RegExp(q, 'i');
            users = users.filter(user => regex.test(user.firstName) || regex.test(user.lastName) || regex.test(user.email));
        }

        res.render('user', { users, q });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.render('user', { users: [], q });
    }
});

// GET route for rendering new user form
userRouter.get('/create', (req, res) => {
    res.render('newuser'); // Render view for creating a new user
});

// POST route for creating a new user
userRouter.post('/create', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        await axios.post('https://api-travell-app-1.onrender.com/user/create', {
            firstName,
            lastName,
            email,
            password
        });

        res.redirect('/users');
    } catch (error) {
        console.error('Error creating user:', error);
        res.render('newuser', { error: 'There was an error creating the user.' });
    }
});

// GET route for editing a user
userRouter.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            console.error('Invalid ID');
            return res.status(400).send('Invalid user ID');
        }

        // Gọi API để lấy thông tin người dùng
        const response = await axios.get(`https://api-travell-app-1.onrender.com/user/dss/${id}`);
        const user = response.data; // Đây là đối tượng người dùng, không phải mảng

        if (!user) {
            console.error('User not found');
            return res.status(404).send('User not found');
        }

        console.log('User found:', user);
        res.render('formedit', { user }); // Gửi đối tượng người dùng vào view

    } catch (error) {
        console.error('Error fetching user for edit:', error.message);
        res.redirect('/users');
    }
});



userRouter.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, role } = req.body; // Lấy thông tin từ body request

    try {
        console.log("Request body:", req.body);  // In ra để kiểm tra xem dữ liệu có đúng không

        // Gửi dữ liệu cập nhật lên API
        const response = await axios.put(`https://api-travell-app-1.onrender.com/user/update/${id}`, {
            firstName,
            lastName,
            email,
            role,
        });

        // Kiểm tra phản hồi từ API
        console.log("API response:", response.data);  // In ra phản hồi để xem dữ liệu trả về

        const updatedUser = response.data.updatedUser; // Lấy thông tin người dùng đã cập nhật thành công

        if (!updatedUser) {
            console.error('User not found after update');
            return res.status(404).send('User not found after update');
        }

        // Sau khi cập nhật thành công, chuyển hướng về trang danh sách người dùng
        res.redirect('/users');  // Chuyển hướng về trang danh sách người dùng sau khi cập nhật thành công

    } catch (error) {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal server error');
    }
});








// POST route for deleting a user
userRouter.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await axios.delete(`https://api-travell-app-1.onrender.com/user/delete/${id}`);
        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.redirect('/users');
    }
});

export default userRouter;