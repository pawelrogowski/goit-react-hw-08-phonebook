import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchContacts } from 'redux/features/contacts/contactsSlice';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const action = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(action)) {
      navigate('/contacts');
      dispatch(fetchContacts());
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="div" sx={{ mt: 3 }}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
