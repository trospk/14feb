export const encodeData = (sender, receiver, message) => {
  const data = JSON.stringify({ s: sender, r: receiver, m: message });
  return btoa(encodeURIComponent(data));
};

export const decodeData = (encodedData) => {
  try {
    const json = decodeURIComponent(atob(encodedData));
    const data = JSON.parse(json);
    return {
      sender: data.s || '',
      receiver: data.r || '',
      message: data.m || ''
    };
  } catch (e) {
    console.error('Failed to decode data:', e);
    return null;
  }
};
