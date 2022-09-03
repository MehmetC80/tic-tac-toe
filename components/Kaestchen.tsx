type Spieler = 'X' | 'O' | 'Unentschieden' | null;

type KaestchenType = {
  gewinner: Spieler;
  value: Spieler;

  onClick: () => void;
};

export const Kaestchen = ({ value, onClick, gewinner }: KaestchenType) => {
  if (!value) {
    return (
      <button
        className='border border-gray-900'
        disabled={Boolean(gewinner)}
        onClick={onClick}
      ></button>
    );
  }
  return (
    <button
      className={
        'border rounded px-4 transition-colors duration-400 ease-in-out py-2 ' +
        (value === 'X' && 'text-red-700 ') +
        (value === 'O' && ' text-black')
      }
    >
      {value}
    </button>
  );
};

//
