import React, { useState } from 'react';

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setFormatted('❌ Invalid JSON');
    }
  };

  return (
    <div>
      <h2>JSON Formatter</h2>
      <textarea className="form-control" rows="5" value={input} onChange={e => setInput(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={formatJson}>Format</button>
      <pre className="mt-3 bg-light p-3">{formatted}</pre>
    </div>
  );
}

export default JsonFormatter;