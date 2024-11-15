import fetch from 'node-fetch';

class UserController {
  static async index(req, res) {
    try {
      const response = await fetch('https://api-travell-app-1.onrender.com/user/dss');
      const users = await response.json();
      res.render('user', { title: 'User List', users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.render('user', { title: 'User List', users: [] });
    }
  }

  static new(req, res) {
    res.render('newUser', { title: 'Create New User' });
  }

  static async edit(req, res) {
    const { id } = req.params;
    try {
      const response = await fetch(`https://api-travell-app-1.onrender.com/user/dss/${id}`);
      const user = await response.json();
      res.render('editUser', { title: 'Edit User', user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.render('editUser', { title: 'Edit User', user: null });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const response = await fetch(`https://api-travell-app-1.onrender.com/user/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        res.redirect('/user');
      } else {
        console.error('Failed to update user');
        res.status(500).send('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
    }
  }

  static async create(req, res) {
    const newUser = req.body;

    try {
      const response = await fetch('https://api-travell-app-1.onrender.com/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        res.redirect('/user');
      } else {
        console.error('Failed to create user');
        res.status(500).send('Error creating user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const response = await fetch(`https://api-travell-app-1.onrender.com/user/delete/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        res.redirect('/user');
      } else {
        console.error('Failed to delete user');
        res.status(500).send('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
    }
  }
}

export default UserController;
