import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

const HeartNote = ({ data }) => {
    const heartRef = useRef(null);

    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff85a2', '#fbb1bd', '#fff0f3']
        });
    }, []);

    const saveImage = () => {
        if (heartRef.current) {
            toPng(heartRef.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `love-note-${data.receiver}.png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('oops, something went wrong!', err);
                });
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100, duration: 1 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
        >
            <div
                ref={heartRef}
                style={{
                    position: 'relative',
                    width: '320px',
                    height: '320px',
                    padding: '20px',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                {/* Simple SVG Heart background */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                    <svg viewBox="0 0 200 200" width="100%" height="100%">
                        <path
                            d="M100 180c-2-2-70-65-70-110 0-25 18-45 45-45 15 0 25 10 25 10s10-10 25-10c27 0 45 20 45 45 0 45-68 108-70 110z"
                            fill="#ff4d6d"
                        />
                    </svg>
                </div>

                <div style={{ color: 'white', padding: '0 40px', zIndex: 1 }}>
                    <p style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>To: {data.receiver}</p>
                    <h3 style={{ fontSize: '20px', marginBottom: '16px', lineHeight: 1.4, fontWeight: 700 }}>{data.message}</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>I <span style={{ color: '#fff' }}>&lt;3</span> You 10,000</p>
                    <p style={{ fontSize: '12px', marginTop: '16px', opacity: 0.9 }}>From: {data.sender}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    onClick={saveImage}
                    style={{
                        backgroundColor: 'white',
                        color: '#ff4d6d',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    <Download size={18} /> Save Image
                </button>
            </div>
        </motion.div>
    );
};

export default HeartNote;
