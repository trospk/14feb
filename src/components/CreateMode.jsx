import React, { useState } from 'react';
import { encodeData } from '../utils/urlState';
import { Copy, Heart, Sparkles } from 'lucide-react';

const CreateMode = () => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const shareLink = `${window.location.origin}${window.location.pathname}?data=${encodeData(sender, receiver, message)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isFormValid = sender && receiver && message;

    return (
        <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Decorative accents */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                <Heart size={120} fill="var(--vibrant-red)" color="var(--vibrant-red)" />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative' }}>
                <div style={{ display: 'inline-flex', padding: '16px', background: 'white', borderRadius: '50%', boxShadow: '0 8px 16px rgba(255, 77, 109, 0.2)', marginBottom: '16px' }}>
                    <Heart size={40} color="var(--vibrant-red)" fill="var(--vibrant-red)" />
                </div>
                <h1 style={{ fontSize: '28px', color: 'var(--deep-crimson)', fontWeight: '800', marginBottom: '8px' }}>Valentine's Love Note</h1>
                <p style={{ color: '#666', fontSize: '15px' }}>Send a magical animated surprise to someone special <Sparkles size={14} style={{ display: 'inline' }} /></p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: 'var(--deep-crimson)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>From</label>
                    <input
                        type="text"
                        placeholder="Your lovely name"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #eee', outline: 'none', transition: 'border-color 0.3s', fontSize: '16px' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-pink)'}
                        onBlur={(e) => e.target.style.borderColor = '#eee'}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: 'var(--deep-crimson)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>To</label>
                    <input
                        type="text"
                        placeholder="Their name"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #eee', outline: 'none', transition: 'border-color 0.3s', fontSize: '16px' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-pink)'}
                        onBlur={(e) => e.target.style.borderColor = '#eee'}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: 'var(--deep-crimson)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message</label>
                    <textarea
                        placeholder="Write your heartfelt message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #eee', outline: 'none', minHeight: '120px', resize: 'vertical', fontSize: '16px', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-pink)'}
                        onBlur={(e) => e.target.style.borderColor = '#eee'}
                    />
                </div>

                <button
                    onClick={handleCopy}
                    disabled={!isFormValid}
                    style={{
                        marginTop: '10px',
                        backgroundColor: isFormValid ? 'var(--vibrant-red)' : '#ccc',
                        color: 'white',
                        padding: '16px',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        opacity: isFormValid ? 1 : 0.7,
                        cursor: isFormValid ? 'pointer' : 'not-allowed'
                    }}
                >
                    {copied ? 'Link Copied! ✨' : <><Copy size={20} /> Generate & Copy Link</>}
                </button>

                {isFormValid && (
                    <div style={{ padding: '16px', background: 'rgba(255, 77, 109, 0.05)', borderRadius: '16px', border: '1px dashed var(--primary-pink)', fontSize: '12px', wordBreak: 'break-all', color: '#888' }}>
                        <span style={{ fontWeight: '700', color: 'var(--vibrant-red)' }}>Ready!</span> Share this link: {shareLink}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateMode;
