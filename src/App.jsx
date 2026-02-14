import React, { useEffect, useState } from 'react'
import CreateMode from './components/CreateMode'
import ViewMode from './components/ViewMode'
import { decodeData } from './utils/urlState'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [params] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const encodedData = params.get('data');
    if (encodedData) {
      const decoded = decodeData(encodedData);
      if (decoded) {
        setData(decoded);
      }
    }
  }, [params]);

  return (
    <div className="App">
      {data ? (
        <ViewMode data={data} />
      ) : (
        <CreateMode />
      )}

      {/* Background Music - Spotify Embed */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        width: '300px',
        opacity: data ? 0.8 : 0.3,
        transition: 'opacity 0.5s ease',
        transform: 'scale(0.8)',
        transformOrigin: 'bottom left'
      }}>
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/track/4j5ffIFh7bFT7GZciP1TCy?utm_source=generator&theme=0&autoplay=1"
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default App

