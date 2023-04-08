import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { themeSettings } from 'theme';
import NavigateRouter from 'routers';
import './styles/index.css';

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <NavigateRouter />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
