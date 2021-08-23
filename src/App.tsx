import './App.css';
import HanguLego from './components/HanguLego';
import { Helmet } from 'react-helmet';

function App() {

  return (
    <div className="App">
      <Helmet>
        <title>HanguLego</title>
        <link rel="canonical" href="https://hangulego.carryou.dev/" />
        <meta name="description" content="Drag colorful bricks to learn Korean words like playing LEGO" />
        <meta name="keywords" content="Carryou, 帶你飛, Hangul, Hangul Lego, hangulego, carry you" />
        <meta property="site_name" content="Carryou 帶你飛"></meta>
        <meta property="og:site_name" content="Carryou 帶你飛"></meta>
        <meta property="og:title" content="HanguLego"></meta>
        <meta property="og:description" content="Drag colorful bricks to learn Korean words like playing LEGO"></meta>
        <meta name="twitter:title" content="HanguLego"></meta>
        <meta name="twitter:description" content="Drag colorful bricks to learn Korean words like playing LEGO"></meta>
      </Helmet>

      <header className="App-header">
        <HanguLego />
      </header>
    </div>
  );
}

export default App;
