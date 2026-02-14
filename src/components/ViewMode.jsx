import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import HeartNote from './HeartNote';

const ViewMode = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        // Play sound or trigger music on interaction
        const youtubeFrame = document.getElementById('youtube-bg-music');
        if (youtubeFrame) {
            // We can't easily control YouTube iframe with just a direct src change without reloading,
            // but the interaction here is the key for autoplay to work.
            // The App.jsx will handle the iframe.
        }

        setTimeout(() => {
            setShowHeart(true);
        }, 1500);
    };

    return (
        <div style={{ width: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
            <AnimatePresence mode="wait">
                {!showHeart ? (
                    <motion.div
                        key="envelope-container"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div
                            className="envelope-wrapper"
                            onClick={handleOpen}
                            style={{ transform: isOpen ? 'translateY(100px)' : 'none' }}
                        >
                            <div
                                className="envelope-flap"
                                style={{
                                    transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                                    zIndex: isOpen ? 1 : 3
                                }}
                            ></div>
                            <div className="envelope-body">
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center', width: '100%' }}>
                                    <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>ส่งมอบความรัก</p>
                                    <Heart size={24} color="#ff4d6d" fill="#ff4d6d" />
                                </div>
                            </div>

                            {/* Address on the back/front of envelope */}
                            <div style={{ position: 'absolute', bottom: '-80px', left: '0', width: '100%', textAlign: 'center' }}>
                                <p style={{ color: 'white', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>จาก: {data.sender}</p>
                                <p style={{ color: 'white', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>ถึง: {data.receiver}</p>
                            </div>
                        </div>

                        {!isOpen && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse' }}
                                style={{ color: 'white', marginTop: '100px', fontWeight: '600' }}
                            >
                                แตะที่ซองจดหมายเพื่อเปิดดู
                            </motion.p>
                        )}
                    </motion.div>
                ) : (
                    <HeartNote key="heart" data={data} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ViewMode;
