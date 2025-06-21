import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img from "../images/image.png"
import img1 from "../images/image copy.png"
export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        py: 5,
        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textShadow: '0 0 10px rgba(0,0,0,0.7)',
      }}
    >
      <Avatar
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIi4s0WsIExQ4GiNOMaT89twzsTJb_JSNVw&s"
        alt="todoiacon"
        sx={{ width: 100, height: 100,  bgcolor: 'rgba(255,255,255,0.3)' }}
      />

      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome!
      </Typography>

      <Typography variant="h6" sx={{ maxWidth: 600, mb: 5, lineHeight: 1.6 }}>
        This project is a collection of ToDo applications built using different state management libraries.
        I created 6 different ToDo versions to compare various approaches and capabilities such as Jotai, Zustand, MobX, Redux, Context, and more.
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{ flexWrap: 'wrap', justifyContent: 'center', maxWidth: 700 ,gap:"20px" }}
      >
        {[
          { label: 'Todo Cat', path: '/cattodo' },
          { label: 'Cat Categories', path: '/catcategories' },
          { label: 'Zustand', path: '/Zustandcategories' },
          { label: 'MobX', path: '/Mobx' },
          { label: 'Jotai Todo', path: '/todo' },
          { label: 'Jotai Categories', path: '/categories' },
        ].map(({ label, path }) => (
          <Button
            key={path}
            variant="contained"
            size="large"
            onClick={() => navigate(path)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              color: '#000',
              fontWeight: 'bold',
              px: 3,
              py: 1.5,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                backgroundColor: '#fff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            {label}
          </Button>

     
        ))}
        <div style={{display:"flex",gap:"20px",justifyContent: 'center',alignItems:"center"}}>
           <img src={img} style={{marginTop:"50px", width:"500px",height:"400px"}} alt="" />
           <img src={img1} alt=""  style={{width:"500px",height:"400px",marginTop:"50px"}}/>
        </div>
       
      </Stack>
    </Box>
  );
}
