import './App.css';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Source } from './components/Source';
import Target from './components/Target';

function App() {

  return (
    <div className="App">

      <header className="App-header">

        <DndProvider backend={HTML5Backend}>

          <h2>
            HanguLego
          </h2>

          <Source hanguls="ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ" />
          <Target />


        </DndProvider>
      </header>
    </div>
  );
}

export default App;
