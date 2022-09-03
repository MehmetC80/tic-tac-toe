type ButtonType = {
  // children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: Boolean | undefined | null;
};

export const Button = ({ onClick, disabled }: ButtonType) => {
  return <button className='border shadow' onClick={onClick}></button>;
};
