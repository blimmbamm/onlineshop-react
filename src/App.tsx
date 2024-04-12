import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, CssBaseline, Grid, IconButton, Link, Paper, Theme, Toolbar, Typography, createTheme, styled } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { green } from "@mui/material/colors";


function App() {

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" variant="elevation">
        <Container maxWidth="md">
          <Toolbar variant="regular" sx={{ gap: 1 }}>
            {/* <IconButton color="inherit">
            <MenuIcon />
          </IconButton> */}
            <Link color="inherit" underline="none">Nav link 1</Link>
            <Typography component="div">Item 1</Typography>
            <Typography flexGrow={1}>Item 2</Typography>
            <Typography>Item 3</Typography>

          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        <Typography height={1000}>Content</Typography>
      </Container>

      <AppBar position="static" component="footer" color={"error"}>
        <Typography>Hello Footer</Typography>
        <Container maxWidth="md">
          {/* <Toolbar variant="regular" sx={{ gap: 1 }} >


          </Toolbar> */}
        </Container>
      </AppBar>


    </>
  )
}

export default App
