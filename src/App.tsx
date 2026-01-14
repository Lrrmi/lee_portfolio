import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { HeaderSimple } from './components/HeaderSimple';

function App() {

  return (
  <MantineProvider theme={theme}>
    <>
    <HeaderSimple />
    </>
    </MantineProvider>
  )
}

export default App

const theme = createTheme({
   colors: {
    deepBlue: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ]
  }
});