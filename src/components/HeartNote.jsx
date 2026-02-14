import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Heart } from 'lucide-react';
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
            // Change background to pink for the image export since SVG is transparent
            const originalBg = heartRef.current.style.background;
            heartRef.current.style.background = 'linear-gradient(135deg, #ff85a2 0%, #ff4d6d 100%)';
            toPng(heartRef.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `love-note-${data.receiver}.png`;
                    link.href = dataUrl;
                    link.click();
                    heartRef.current.style.background = originalBg;
                })
                .catch((err) => {
                    console.error('oops, something went wrong!', err);
                    heartRef.current.style.background = originalBg;
                });
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100, duration: 1 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}
        >
            <div
                ref={heartRef}
                style={{
                    position: 'relative',
                    width: '380px',
                    height: '380px',
                    padding: '40px',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                {/* Richer SVG Heart background */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}>
                        <defs>
                            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ff85a2', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#ff4d6d', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <path
                            d="M100 180c-2-2-70-65-70-110 0-25 18-45 45-45 15 0 25 10 25 10s10-10 25-10c27 0 45 20 45 45 0 45-68 108-70 110z"
                            fill="url(#heartGradient)"
                        />
                    </svg>
                </div>

                <div style={{ color: 'white', padding: '0 20px', zIndex: 1 }}>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}
                    >
                        ถึง: {data.receiver}
                    </motion.p>
                    <motion.h3
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        style={{ fontSize: '24px', marginBottom: '24px', lineHeight: 1.4, fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    >
                        "{data.message}"
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <p style={{ fontSize: '14px', marginTop: '20px', fontWeight: '600', opacity: 0.9 }}>ด้วยรักจาก, {data.sender}</p>
                    </motion.div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    onClick={saveImage}
                    style={{
                        backgroundColor: 'white',
                        color: 'var(--vibrant-red)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '16px 32px',
                        borderRadius: '50px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                >
                    <Download size={20} /> บันทึกโน้ตของฉัน
                </button>
            </div>

        </motion.div>
    );
};

export default HeartNote;
