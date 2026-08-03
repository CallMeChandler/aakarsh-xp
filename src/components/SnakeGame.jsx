import { useEffect, useState, useRef } from "react";

const boardSize = 20;
const initialSnake = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

export default function SnakeGame() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateFood(initialSnake));
  const [dir, setDir] = useState("ArrowRight");
  const [isGameOver, setGameOver] = useState(false);
  const intervalRef = useRef();

  function generateFood(snake) {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (directions[e.key]) {
        setDir((prev) => (isOpposite(prev, e.key) ? prev : e.key));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + directions[dir].x,
          y: prevSnake[0].y + directions[dir].y,
        };

        // Game over check
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= boardSize ||
          newHead.y >= boardSize ||
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          clearInterval(intervalRef.current);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(intervalRef.current);
  }, [dir, food]);

  function isOpposite(dir1, dir2) {
    return (
      (dir1 === "ArrowUp" && dir2 === "ArrowDown") ||
      (dir1 === "ArrowDown" && dir2 === "ArrowUp") ||
      (dir1 === "ArrowLeft" && dir2 === "ArrowRight") ||
      (dir1 === "ArrowRight" && dir2 === "ArrowLeft")
    );
  }

  return (
    <div className="flex flex-col items-center p-4 text-center">
      <h2 className="font-bold text-xl mb-4">🐍 Snake Game</h2>
      {isGameOver && <div className="text-red-600 font-bold">Game Over!</div>}
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${boardSize}, 20px)`,
          gridTemplateColumns: `repeat(${boardSize}, 20px)`,
          border: "2px solid #333",
        }}
      >
        {[...Array(boardSize)].map((_, row) =>
          [...Array(boardSize)].map((_, col) => {
            const isSnake = snake.some((seg) => seg.x === col && seg.y === row);
            const isFood = food.x === col && food.y === row;
            return (
              <div
                key={`${row}-${col}`}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: isSnake ? "#4caf50" : isFood ? "#e91e63" : "#fff",
                  border: "1px solid #ccc",
                }}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
}
