/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/Routes';

 const App = () => {

   return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Routes />
    </>
   );
 };

 export default App;
