import { GameMode, Difficulty } from '@/hooks/useTicTacToe';

interface GameControlsProps {
  gameMode: GameMode;
  difficulty: Difficulty;
  onGameModeChange: (mode: GameMode, difficulty?: Difficulty) => void;
  onResetGame: () => void;
  onResetScores: () => void;
}

export const GameControls = ({ 
  gameMode, 
  difficulty, 
  onGameModeChange, 
  onResetGame, 
  onResetScores 
}: GameControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Game Mode Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-center">Game Mode</h3>
        <div className="flex gap-3 justify-center">
          <button
            className={`
              game-button
              ${gameMode === 'human' ? 'game-button-primary' : 'game-button-outline'}
            `}
            onClick={() => onGameModeChange('human')}
          >
            Human vs Human
          </button>
          <button
            className={`
              game-button
              ${gameMode === 'ai' ? 'game-button-primary' : 'game-button-outline'}
            `}
            onClick={() => onGameModeChange('ai', difficulty)}
          >
            Human vs AI
          </button>
        </div>
      </div>

      {/* AI Difficulty Selection */}
      {gameMode === 'ai' && (
        <div className="space-y-3 animate-slide-in-down">
          <h3 className="text-lg font-semibold text-center">AI Difficulty</h3>
          <div className="flex gap-3 justify-center">
            <button
              className={`
                game-button
                ${difficulty === 'easy' ? 'game-button-secondary' : 'game-button-outline'}
              `}
              onClick={() => onGameModeChange('ai', 'easy')}
            >
              Easy
            </button>
            <button
              className={`
                game-button
                ${difficulty === 'hard' ? 'game-button-secondary' : 'game-button-outline'}
              `}
              onClick={() => onGameModeChange('ai', 'hard')}
            >
              Hard
            </button>
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="flex gap-3 justify-center">
        <button
          className="game-button-outline"
          onClick={onResetGame}
        >
          New Game
        </button>
        <button
          className="game-button-outline"
          onClick={onResetScores}
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
};