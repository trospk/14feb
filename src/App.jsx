import React, { useEffect, useState } from 'react'
import CreateMode from './components/CreateMode'
import ViewMode from './components/ViewMode'
import { decodeData } from './utils/urlState'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [params] = useState(new URLSearchParams(window.location.search));
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const encodedData = params.get('data');
    if (encodedData) {
      const decoded = decodeData(encodedData);
      if (decoded) {
        setData(decoded);
      }
    }

    // Generate floating hearts background
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      size: Math.random() * 20 + 10 + 'px',
      duration: Math.random() * 5 + 10 + 's',
      delay: Math.random() * 10 + 's'
    }));
    setHearts(newHearts);
  }, [params]);

  return (
    <div className="App">
      {/* Floating Hearts Background */}
      <div className="bg-hearts">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart-particle"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {data ? (
        <ViewMode data={data} />
      ) : (
        <CreateMode />
      )}

      {/* Background Music - YouTube Embed (Hidden) */}
      <div style={{ position: 'fixed', bottom: '-100px', left: '-100px', pointerEvents: 'none', opacity: 0 }}>
        <iframe
          id="youtube-bg-music"
          width="1"
          height="1"
          src="https://www.youtube.com/embed/TlvFo3umL1c?autoplay=1&loop=1&playlist=TlvFo3umL1c"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default App
