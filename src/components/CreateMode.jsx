import React, { useState } from 'react';
import { encodeData } from '../utils/urlState';
import { Send, Copy, Image as ImageIcon, Heart } from 'lucide-react';
import { toPng } from 'html-to-image';

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

    return (
        <div className="glass-card">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Heart size={48} color="#ff4d6d" fill="#ff4d6d" />
                <h1 style={{ marginTop: '12px', color: '#ff4d6d' }}>Create Love Note</h1>
                <p style={{ color: '#666' }}>Fill in the details to send a digital valentine</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>From (Sender)</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>To (Receiver)</label>
                    <input
                        type="text"
                        placeholder="Their name"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Message</label>
                    <textarea
                        placeholder="Write something sweet..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', minHeight: '100px', resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button
                        onClick={handleCopy}
                        disabled={!sender || !receiver || !message}
                        style={{ flex: 1, backgroundColor: '#ff4d6d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        {copied ? 'Copied!' : <><Copy size={18} /> Copy Link</>}
                    </button>
                </div>

                {sender && receiver && message && (
                    <div style={{ marginTop: '12px', padding: '12px', background: '#fff', borderRadius: '12px', fontSize: '12px', wordBreak: 'break-all', color: '#888' }}>
                        {shareLink}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateMode;
