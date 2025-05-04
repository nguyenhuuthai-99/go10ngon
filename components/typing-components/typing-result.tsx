import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";

interface Props {
  typedWords: string[];
  words: string[];
}
export function TypingResult({ typedWords, words }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const totalKeystrokes = useAppSelector(
    (state) => state.typingSessionStats.totalKeystrokes,
  );

  const { wpm, accuracy, adjustedWpm } = useAppSelector(
    (state) => state.typingSessionPerformance,
  );

  const incorrectPairs = words
    .map((original, index) => ({
      original,
      typed: typedWords[index] || "",
    }))
    .filter((pair) => pair.original !== pair.typed);

  useEffect(() => {
    setShow(!show);
  }, [wpm, accuracy]);

  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }mx-auto mt-10 max-w-3xl space-y-6`}
    >
      {totalKeystrokes}
      <span>{adjustedWpm}</span>
      {/* Card for WPM and Accuracy */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-md">
        <div className="text-primary mb-2 text-4xl font-bold">Your Stats</div>
        <div className="flex justify-around text-3xl font-semibold text-gray-800">
          <div>
            <div className="text-sm text-gray-500">WPM</div>
            <div>{wpm}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Accuracy</div>
            <div>{accuracy}%</div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-300" />

      {/* Incorrect Words */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-red-600">
          Incorrect Words
        </h3>
        {incorrectPairs.length === 0 ? (
          <p className="text-green-600">Perfect! No incorrect words.</p>
        ) : (
          <ul className="space-y-2">
            {incorrectPairs.map((pair, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-3"
              >
                <span className="text-gray-700">
                  <strong className="text-red-600">Typed:</strong>{" "}
                  {pair.typed || "(empty)"}
                </span>
                <span className="text-gray-700">
                  <strong className="text-green-600">Expected:</strong>{" "}
                  {pair.original}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
