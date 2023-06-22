import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import ACP from './pages/AccessCodePage'
import QuizGame from './pages/QuizGame';
import PlayQuiz from './pages/playerQuiz';
import SetUsername from './pages/SetUsernamePAge';
import QuizList from './pages/QuizList'
import CreateQuiz from './pages/CreateQuizPage';
import LobbyPage from './pages/LobbyPage';
import Top3 from './pages/Top3Page';
import FinalUserPage from './pages/FinalUserPage';
function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
      <Routes>
        <Route
        path='/'
        element={<Home/>}
        />

        <Route
        path='/ACP/:quizId'
        element={<ACP/>}
        />

        <Route
        path='/quizgame/:quizId'
        element={<QuizGame/>}
        />

         <Route
        path='/quizplayer/:code/:id'
        element={<PlayQuiz/>}
        />

        <Route
        path='/SetUsername/:code'
        element={<SetUsername/>}
        />

        <Route
         path='/QuizList'
        // path='/'
        element={<QuizList/>}
        />
        
        <Route
        path='/CreateQuiz'
        element={<CreateQuiz/>}
        />

        <Route
        path='/Lobby/:code'
        element={<LobbyPage/>}
        />

        <Route
        path='/Top3/:code'
        element={<Top3/>}
        />

        <Route
        path='/result'
        element={<FinalUserPage/>}
        />

      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
