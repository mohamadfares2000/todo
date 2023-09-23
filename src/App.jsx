import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { TodosContext } from './contexts/TodosContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'A',
      ]},

      palette: {
        primary: {
          main : '#dd2c00'
        },
      },
  });

const initalTodos=[
  {
  id : uuidv4(),
  title : 'قراءة كتاب ',
  descripstion : 'خنةبسخسبخوسب',
  isCompleted : false
  }
];

const [todos , setTodos] = useState(initalTodos);

  return (
    <div className='main'>
      <ThemeProvider theme={theme}>
        <TodosContext.Provider value={{todos : todos  , setTodos : setTodos }} >
          <TodoList />
        </TodosContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
