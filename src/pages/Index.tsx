import { TicTacToeGame } from '@/components/TicTacToeGame';

const Index = () => {
  return (
    <>
      <head>
        <title>Tic-Tac-Toe Game - Play Human vs Human or vs AI</title>
        <meta name="description" content="Play the classic Tic-Tac-Toe game with beautiful graphics. Choose between Human vs Human or challenge AI with Easy and Hard difficulty levels. Features minimax algorithm for unbeatable AI." />
        <meta name="keywords" content="tic-tac-toe, game, AI, minimax, human vs human, puzzle game, strategy game" />
        <link rel="canonical" href="/" />
      </head>
      <main>
        <TicTacToeGame />
      </main>
    </>
  );
};

export default Index;
