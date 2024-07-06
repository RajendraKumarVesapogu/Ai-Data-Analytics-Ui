import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./query.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Query = () => {
  const [columns, setColumns] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [operator, setOperator] = useState('=');
  const [value, setValue] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Fetch columns from the GameData model
    const fetchColumns = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/columns/');
        setColumns(response.data);
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
    } catch (error) {
      console.error('Error performing query:', error);
    }
  };

  const renderAggregateChart = (data, title) => {
    if (!data) return null;

    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }
      ]
    };

    return (
      <div>
        <h3>{title}</h3>
        <Pie data={chartData} />
      </div>
    );
  };

  const renderSearchResults = (data) => {
    if (!data || data.length === 0) return null;

    return (
      <div>
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
    <div>
      <h1>Game Data Analytics</h1>
      
      <div>
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

      {results && (
        <div>
          {renderAggregateChart(results.aggregate_results, "Aggregate Results")}
          {renderAggregateChart(results.constrained_aggregate_results, "Constrained Aggregate Results")}
          {renderSearchResults(results.search_results)}
        </div>
      )}
    </div>
  );
};

export default Query;