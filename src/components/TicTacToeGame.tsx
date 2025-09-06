import { useEffect } from 'react';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameStatus } from './GameStatus';

export const TicTacToeGame = () => {
  const { 
    gameBoard, 
    makeMove, 
    makeAIMove, 
    resetGame, 
    setGameMode, 
    resetScores 
  } = useTicTacToe();

  // Handle AI move after human move
  useEffect(() => {
    if (
      gameBoard.gameMode === 'ai' && 
      gameBoard.currentPlayer === 'O' && 
      gameBoard.gameState === 'playing'
    ) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [gameBoard.gameMode, gameBoard.currentPlayer, gameBoard.gameState, makeAIMove]);

  const handleCellClick = (index: number) => {
    makeMove(index);
  };

  const isDisabled = () => {
    return gameBoard.gameState !== 'playing' || 
           (gameBoard.gameMode === 'ai' && gameBoard.currentPlayer === 'O');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent mb-4">
            Tic-Tac-Toe
          </h1>
          <p className="text-xl text-[hsl(var(--muted-foreground))]">
            Challenge yourself against AI or play with a friend!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Game Controls */}
          <div className="lg:order-1">
            <GameControls
              gameMode={gameBoard.gameMode}
              difficulty={gameBoard.difficulty}
              onGameModeChange={setGameMode}
              onResetGame={resetGame}
              onResetScores={resetScores}
            />
          </div>

          {/* Game Board */}
          <div className="lg:order-2 flex justify-center">
            <GameBoard
              board={gameBoard.board}
              onCellClick={handleCellClick}
              winningLine={gameBoard.winningLine}
              disabled={isDisabled()}
            />
          </div>

          {/* Game Status */}
          <div className="lg:order-3">
            <GameStatus
              gameState={gameBoard.gameState}
              currentPlayer={gameBoard.currentPlayer}
              winner={gameBoard.winner}
              gameMode={gameBoard.gameMode}
              scores={gameBoard.scores}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[hsl(var(--muted-foreground))] text-sm">
          <p>
            {gameBoard.gameMode === 'ai' && gameBoard.difficulty === 'hard' 
              ? 'Hard AI uses the minimax algorithm - good luck!' 
              : 'Have fun playing!'
            }
          </p>
        </div>
      </div>
    </div>
  );
};