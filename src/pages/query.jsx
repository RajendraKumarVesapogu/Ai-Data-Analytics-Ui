import { useState, useEffect } from 'react';
import axios from 'axios';
import "./query.css";

const Query = () => {
  const [columns, setColumns] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [operator, setOperator] = useState('>');
  const [value, setValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [customResults, setCustomResults] = useState(null);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = localStorage.getItem("columns");
        setColumns(JSON.parse(response));
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };
    fetchColumns();
  }, []);

  const handleQuery = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/query/?field=${selectedField}&operator=${operator}&value=${value}`);
      setResults(response.data);
      setCustomResults(null);
    } catch (error) {
      console.error('Error performing query:', error);
    }
  };

  const handleCustomQuery = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/query/', { prompt });
      setCustomResults(response.data);
      setResults(null);
    } catch (error) {
      console.error('Error performing custom query:', error);
    }
  };

  const renderAggregateResults = (data, title) => {
    if (!data) return null;

    return (
      <div className="aggregate-results">
        <h3>{title}</h3>
        <div className="circle-container">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="circle">
              <div className="circle-content">
                <div className="circle-value">{value}</div>
                <div className="circle-label">{key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSearchResults = (data) => {
    if (!data || data.length === 0) return null;

    return (
      <div className="search-results">
        <h3>Search Results</h3>
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="query-container">
      <h1>Game Data Analytics</h1>
      
      <div className="query-inputs">
        <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
          <option value="">Select a field</option>
          {columns.map((column) => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
        
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="=">=</option>
          <option value=">">{'>'}</option>
          <option value=">=">{'>'}=</option>
          <option value="<">{'<'}</option>
          <option value="<=">{'<'}=</option>
        </select>
        
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter value"
        />
        
        <button onClick={handleQuery}>Query</button>
      </div>

      <div className="custom-query">
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Enter custom query prompt"
        />
        <button onClick={handleCustomQuery}>Custom Query</button>
      </div>

      {results && (
        <div className="results">
          {renderAggregateResults(results.aggregate_results, "Aggregate Results")}
          {renderAggregateResults(results.constrained_aggregate_results, "Constrained Aggregate Results")}
          {renderSearchResults(results.search_results)}
        </div>
      )}

      {customResults && (
        <div className="custom-results">
          <h3>Custom Query Results</h3>
          {renderSearchResults(customResults.custom_prompt_results)}
        </div>
      )}
    </div>
  );
};

export default Query;