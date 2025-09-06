import { Player, GameState, GameMode } from '@/hooks/useTicTacToe';

interface GameStatusProps {
  gameState: GameState;
  currentPlayer: Player;
  winner: Player;
  gameMode: GameMode;
  scores: { X: number; O: number; draws: number };
}

export const GameStatus = ({ 
  gameState, 
  currentPlayer, 
  winner, 
  gameMode, 
  scores 
}: GameStatusProps) => {
  const getStatusMessage = () => {
    if (gameState === 'won') {
      return (
        <div className="text-center animate-bounce-in">
          <div className={`text-3xl font-bold ${winner === 'X' ? 'game-x' : 'game-o'}`}>
            Player {winner} Wins! 🎉
          </div>
        </div>
      );
    }
    
    if (gameState === 'draw') {
      return (
        <div className="text-center animate-bounce-in">
          <div className="text-3xl font-bold text-[hsl(var(--muted-foreground))]">
            It's a Draw! 🤝
          </div>
        </div>
      );
    }

    const playerLabel = gameMode === 'ai' && currentPlayer === 'O' 
      ? 'AI' 
      : `Player ${currentPlayer}`;

    return (
      <div className="text-center">
        <div className="text-xl font-semibold text-[hsl(var(--muted-foreground))]">
          Current Turn:
        </div>
        <div className={`text-2xl font-bold ${currentPlayer === 'X' ? 'game-x' : 'game-o'}`}>
          {playerLabel}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Status Message */}
      <div className="bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))]">
        {getStatusMessage()}
      </div>

      {/* Scoreboard */}
      <div className="bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))]">
        <h3 className="text-lg font-semibold text-center mb-4">Scoreboard</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="game-x text-2xl font-bold">{scores.X}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Player X</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[hsl(var(--muted-foreground))]">{scores.draws}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Draws</div>
          </div>
          <div>
            <div className="game-o text-2xl font-bold">{scores.O}</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              {gameMode === 'ai' ? 'AI' : 'Player O'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};