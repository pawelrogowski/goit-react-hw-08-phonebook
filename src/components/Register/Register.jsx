import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/contacts');
    }
  }, [user, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <Container maxWidth="sm">
      <Box component="div" sx={{ mt: 3 }}>
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              required
            />
          </Box>
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
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
