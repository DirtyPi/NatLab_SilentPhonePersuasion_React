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
        path='/quizplayer/'
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

      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
