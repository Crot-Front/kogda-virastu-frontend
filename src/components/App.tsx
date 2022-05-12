import React, { useEffect } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from '../services/hooks';
import Profile from './Profile/Profile';
import Header from './Header';
import Editor from './Editor';
import Register from '../pages/register';
import Login from '../pages/login';
import Settings from '../pages/settings';
import { jwt } from '../services/api';
import Home from './Home';
import Article from './Article/index';
import { getUserThunk } from '../thunks';
import basicThemes, { defaultTheme } from '../themes/index';
import {setLanguage} from "../store";
import Footer from '../widgets/Footer';

const App = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentLang } = useSelector((state) => state.system);
  const { themes, langNames, vocabularies } = useSelector((state) => state.all);

  useEffect(() => {
    if (jwt.test()) {
      dispatch(getUserThunk());
    }
  }, [dispatch]);

useEffect(() => {
  const language = navigator.language.split('-')[0];
  if (langNames.includes(language)) {
    dispatch(setLanguage(language));
  }
},[dispatch])
  return (
    <div>
      <IntlProvider locale={currentLang} messages={vocabularies[currentLang]}>
        <ThemeProvider theme={
          themes[currentTheme ?? defaultTheme]
          ?? basicThemes[currentTheme ?? defaultTheme]
        }>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/article/:id' element={<Article />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/editor/:slug' element={<Editor />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/:username' element={<Profile />} />
          </Routes>

          <Footer />
        </ThemeProvider>
      </IntlProvider>
    </div>
  );
};

export default App;
