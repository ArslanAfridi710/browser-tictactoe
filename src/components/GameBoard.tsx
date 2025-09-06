import { Player } from '@/hooks/useTicTacToe';

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

export const GameBoard = ({ board, onCellClick, winningLine, disabled }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-[hsl(var(--game-board))] rounded-2xl shadow-2xl">
      {board.map((cell, index) => (
        <button
          key={index}
          className={`
            game-cell
            ${winningLine?.includes(index) ? 'winning' : ''}
            ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
          onClick={() => !disabled && onCellClick(index)}
          disabled={disabled || cell !== null}
        >
          {cell && (
            <span 
              className={`
                ${cell === 'X' ? 'game-x' : 'game-o'}
                animate-bounce-in
              `}
            >
              {cell}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};