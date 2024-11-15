import express from 'express';
import axios from 'axios';



const router = express.Router();


// GET route for trip list
router.get('/', async (req, res) => {
    const q = req.query.q || '';

    try {
        const response = await axios.get('https://api-travell-app-1.onrender.com/trip/');
        let travels = response.data;

        if (q) {
            const regex = new RegExp(q, 'i');
            travels = travels.filter(travel => regex.test(travel.title));
        }

        res.render('travel', { travels, q });
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.render('travel', { travels: [], q });
    }
});



router.get('/create', (req, res) => {
    res.render('newtraveling'); // Render view for creating a new trip
});

router.post('/create', async (req, res) => {
    const { title, location, imageUrl, description, date, time, guide } = req.body;

    try {
        await axios.post('https://api-travell-app-1.onrender.com/trip/create', {
            title,
            location,
            imageUrl,
            description,
            date,
            time,
            guide
        });

        res.redirect('/travel');
    } catch (error) {
        console.error('Error creating trip:', error);
        res.render('newtraveling', { error: 'There was an error creating the trip.' });
    }
});



router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if ID is valid before making a request
        if (!id) {
            console.error('Invalid ID');
            return res.status(400).send('Invalid trip ID');
        }

        // Fetch the trip data from the API
        const response = await axios.get(`https://api-travell-app-1.onrender.com/trip/${id}`);
        const trip = response.data;

        if (!trip) {
            console.error('Trip not found');
            return res.status(404).send('Trip not found');
        }

        // Render view with the trip data
        res.render('edittraveling', { trip });
    } catch (error) {
        console.error('Error fetching trip for edit:', error.message);
        res.redirect('/travel');
    }
});

// PUT route for updating a trip
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, location, imageUrl, description, date, time, guide } = req.body;

    try {
        const response = await axios.put(`https://api-travell-app-1.onrender.com/trip/update/${id}`, {
            title,
            location,
            imageUrl,
            description,
            date,
            time,
            guide,
        });
        res.redirect('/travel');
    } catch (error) {
        console.error('Error updating trip:', error.response ? error.response.data : error.message);
        res.redirect(`/travel/edit/${id}`);
    }
});


// POST route for deleting a trip
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await axios.delete(`https://api-travell-app-1.onrender.com/trip/delete/${id}`);
        res.redirect('/travel');
    } catch (error) {
        console.error('Error deleting trip:', error.message);
        res.redirect('/travel');
    }
});

export default router;