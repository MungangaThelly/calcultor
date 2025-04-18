import { useState } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [state, setState] = useState({
    num1: 0,
    num2: 0,
    operation: '+',
    result: 0
  });

  const calculate = () => {
    const { num1, num2, operation } = state;
    const result = {
      '+': num1 + num2,
      '-': num1 - num2,
      '*': num1 * num2,
      '/': num1 / num2
    }[operation] || 0;
    
    setState({ ...state, result });
  };

  const handleChange = (field) => (e) => {
    const value = field === 'operation' ? e.target.value : Number(e.target.value);
    setState({ ...state, [field]: value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kalkylator</h1>
      <div className={styles.inputGroup}>
        <input
          type="number"
          value={state.num1}
          onChange={handleChange('num1')}
          aria-label="Första numret"
        />
        <select
          value={state.operation}
          onChange={handleChange('operation')}
          aria-label="Operation"
        >
          {['+', '-', '*', '/'].map(op => 
            <option key={op} value={op}>{op}</option>
          )}
        </select>
        <input
          type="number"
          value={state.num2}
          onChange={handleChange('num2')}
          aria-label="Andra numret"
        />
      </div>
      <button onClick={calculate} className={styles.button}>Beräkna</button>
      <p className={styles.result}>Resultat: {state.result}</p>
    </div>
  );
}