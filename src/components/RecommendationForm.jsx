import { useState } from 'react';

const RecommendationForm = () => {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [tipType, setTipType] = useState('foder'); 
  const [recommendation, setRecommendation] = useState('');

  const getRecommendation = async () => {
    const prompt = `Ge rekommendationer för ${tipType} baserat på hunden rasen ${breed}, ålder ${age}, vikt ${weight} kg${tipType === 'foder' ? ` och allergier: ${allergies}` : '.'}`;
    
    try {
      const response = await fetch('http://localhost:5001/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setRecommendation(data.data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  return (
    <div>
      <h1>Få rekommendationer för din hund</h1>
      <input placeholder="Ras" value={breed} onChange={(e) => setBreed(e.target.value)} />
      <input placeholder="Ålder" value={age} onChange={(e) => setAge(e.target.value)} />
      <input placeholder="Vikt" value={weight} onChange={(e) => setWeight(e.target.value)} />
      
      {/* Dropdown för att välja tipstyp */}
      <select value={tipType} onChange={(e) => setTipType(e.target.value)}>
        <option value="foder">Foder</option>
        <option value="aktiviteter">Aktiviteter</option>
        <option value="hundvård">Allmänvård</option>
        <option value="produkter">Produkter och tillbehör</option>
      </select>

      {/* Konditionell rendering för allergi-input */}
      {tipType === 'foder' && (
        <input 
          placeholder="Allergier" 
          value={allergies} 
          onChange={(e) => setAllergies(e.target.value)} 
        />
      )}

      <button onClick={getRecommendation}>Få rekommendation</button>
      {recommendation && (
        <div>
          <h2>Rekommendationer:</h2>
          {recommendation.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;
