import React, { useState } from 'react';

function Base64Tool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const encode = () => setResult(btoa(text));
  const decode = () => {
    try {
      setResult(atob(text));
    } catch {
      setResult('❌ Invalid Base64');
    }
  };

  return (
    <div>
      <h2>Base64 Encoder/Decoder</h2>
      <textarea className="form-control" rows="4" value={text} onChange={e => setText(e.target.value)} />
      <div className="mt-2">
        <button className="btn btn-success me-2" onClick={encode}>Encode</button>
        <button className="btn btn-warning" onClick={decode}>Decode</button>
      </div>
      <pre className="mt-3 bg-light p-3">{result}</pre>
    </div>
  );
}

export default Base64Tool;