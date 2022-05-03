import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import './index.scss';

const Editor = () => {
  const [value, setValue] = useState('// Write your code here');
  const [cData, setCData] = useState('');
  const [closeModal, setCloseModal] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // eslint-disable-next-line no-eval
        const data = eval(value);
        if (data) {
          setCData(JSON.stringify(data, null, 2));
        } else {
          setCData('// conosle output');
        }
      } catch (error) {
        setCData(error.message);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [value]);

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div className='editor'>
      <AceEditor
        value={value}
        mode='javascript'
        theme='dracula'
        onChange={handleChange}
        name='UNIQUE_ID_OF_DIV'
        className='editorcode'
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 1,
        }}
      />
      <div className='editor-console'>
        <textarea
          readOnly
          className='editor-console__textarea'
          value={cData ? cData : '// conosle output'}
        />
      </div>
      {closeModal && (
        <div className='popup'>
          <h2>Welcome to online Javascript editor</h2>
          <h4>Notes:</h4>
          <p>1) Instead of writing console.log use variable itself.</p>
          <p>2) To call api use Promises.</p>
          <p>3) New features yet to be added.</p>
          <button onClick={() => setCloseModal(!closeModal)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Editor;
