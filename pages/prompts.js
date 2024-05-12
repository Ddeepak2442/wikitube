import React, { useEffect, useState } from 'react';

const PromptsPage = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/getPrompts');
      if (response.ok) {
        const data = await response.json();
        setPrompts(data.slice(0, 10)); // Get only the latest 10 records
      }
    };

    fetchPrompts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Prompts</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Prompt Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Wikipedia Link</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Code</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {prompts.map((prompt) => (
            <tr key={prompt.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prompt.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prompt.prompt_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prompt.prompt}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <a href={prompt.wikipedia_link} target="_blank" rel="noopener noreferrer">
                    {prompt.wikipedia_link}
                 
                </a>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {prompt.code}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {prompt.imageBase64 ? (
                  <img src={`data:image/jpeg;base64,${prompt.imageBase64}`} alt={prompt.prompt_name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                ) : (
                  'No image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromptsPage;