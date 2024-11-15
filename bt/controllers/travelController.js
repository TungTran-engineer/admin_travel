import express from 'express';
import axios from 'axios'; // Dùng axios thay vì node-fetch

const router = express.Router();

router.get('/', async (req, res) => {
    const q = req.query.q || ''; // Lấy giá trị tìm kiếm từ query string (nếu có)
    
    try {
        // Fetch trips data from the API
        const response = await axios.get('https://api-travell-app-1.onrender.com/trip/');
        let travels = response.data; // Lấy dữ liệu từ API

        // Nếu có giá trị tìm kiếm, lọc kết quả
        if (q) {
            const regex = new RegExp(q, 'i'); // Tạo biểu thức chính quy để tìm kiếm không phân biệt hoa thường
            travels = travels.filter(travel => regex.test(travel.title)); // Lọc các chuyến đi theo title
        }

        // Render view với dữ liệu chuyến đi và query tìm kiếm
        res.render('travel', { travels, q });
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.render('travel', { travels: [], q }); // Nếu có lỗi, hiển thị mảng rỗng
    }
    
});
export default router;
