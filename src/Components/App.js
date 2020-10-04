import React from 'react';
import {ThemeProvider} from 'styled-components';

import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';

const App = () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
