
import { useEffect, useState } from 'react';

const MathBackground = () => {
  const [symbols, setSymbols] = useState<Array<{ id: number; symbol: string; delay: number }>>([]);
  
  const mathSymbols = ['∫', '∑', 'π', '∆', '∇', '∞', '∂', '√', 'θ', 'λ', 'μ', 'σ', 'Ω', 'α', 'β', 'γ', '∏', '≈', '≤', '≥', '≠', '∈', '∪', '∩', '⊂', '⊃', '∀', '∃', '∴', '∵'];

  useEffect(() => {
    const generateSymbols = () => {
      const newSymbols = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
        delay: Math.random() * 20
      }));
      setSymbols(newSymbols);
    };

    generateSymbols();
    const interval = setInterval(generateSymbols, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((item) => (
        <div
          key={item.id}
          className="math-symbol floating-math text-6xl font-mono"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${item.delay}s`,
            fontSize: `${2 + Math.random() * 4}rem`
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default MathBackground;
