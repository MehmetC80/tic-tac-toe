import { useEffect, useState } from 'react';
import { Kaestchen } from '../Kaestchen';

export const SpielFlaeche = () => {
  const [kaestchen, setKaestchen] = useState(Array(9).fill(null));
  const [spieler, setSpieler] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  );
  const [gewinner, setGewinner] = useState<Spieler>(null);

  const setKaestchenWert = (index: number) => {
    const neuDaten = kaestchen.map((wert, i) => {
      if (i === index) {
        return spieler;
      }
      return wert;
    });
    setKaestchen(neuDaten);
    setSpieler(spieler === 'X' ? 'O' : 'X');
  };

  const reset = () => {
    setKaestchen(Array(9).fill(null));
    setGewinner(null);
    setSpieler(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  };

  type Spieler = 'X' | 'O' | 'Unentschieden' | null;

  const siegerKalkulation = (kaestchen: Spieler[]) => {
    const linien = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < linien.length; i++) {
      const [x, y, z] = linien[i];
      if (
        kaestchen[x] &&
        kaestchen[x] === kaestchen[y] &&
        kaestchen[x] === kaestchen[z]
      ) {
        return kaestchen[x];
      }
    }
    return null;
  };

  useEffect(() => {
    const sieger = siegerKalkulation(kaestchen);
    if (sieger) {
      setGewinner(sieger);
    }

    if (!sieger && !kaestchen.filter((kaestchen) => !kaestchen).length) {
      setGewinner('Unentschieden');
    }

    const storedValue = window.localStorage.getItem('kaestchen');
  }, []);

  return (
    <div
      className='flex justify-center flex-col items-center mt-10
    '
    >
      {!gewinner && <p>{spieler}, ist am Zug!</p>}
      {gewinner && gewinner !== 'Unentschieden' && (
        <p>
          Herzlichen Glückwunsh Spieler {gewinner} hat das Spiel gewonnen!!!
        </p>
      )}
      {gewinner && gewinner === 'Unentschieden' && (
        <p>Das Spiel endet mit unentschieden!!!</p>
      )}
      <div className='grid grid-cols-3 w-8/12 h-48 sm:w-6/12 sm:h-48 md:w-6/12 md:h-48 lg:w-4/12 lg:h-48 xl:w-2/12'>
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Kaestchen
                key={i}
                gewinner={gewinner}
                onClick={() => setKaestchenWert(i)}
                value={kaestchen[i]}
              />
            );
          })}
      </div>
      <button
        className='border mt-5 px-4 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out'
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};
