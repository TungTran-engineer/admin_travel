import express from 'express';
import axios from 'axios'; // Import axios for HTTP requests

const loginadminRoutes = express.Router();

// GET route for displaying the login page
loginadminRoutes.get('/', (req, res) => {
    res.render('admin', { error: null }); // Render the login page initially without an error message
});

// POST route to handle login submissions
loginadminRoutes.post('/signin', async (req, res) => {
    console.log('POST /signin called');
    const { username, password } = req.body; // Lấy thông tin từ biểu mẫu
    console.log('Received data:', { username, password });

    try {
        // Gọi API để lấy thông tin quản trị viên
        const response = await axios.get('https://api-travell-app-1.onrender.com/admin/');
        const admins = response.data;

        // Kiểm tra thông tin xác thực
        const validAdmin = admins.find(
            admin => admin.username === username && admin.password === password
        );

        if (validAdmin) {
            // Đăng nhập thành công, chuyển hướng tới trang dashboard
            res.redirect('/dashboard'); // Đảm bảo bạn có route cho /dashboard
        } else {
            // Đăng nhập không thành công, hiện thông báo lỗi
            res.render('admin', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error fetching admin data:', error);
        res.render('admin', { error: 'An error occurred during login. Please try again later.' });
    }
});

export default loginadminRoutes;
