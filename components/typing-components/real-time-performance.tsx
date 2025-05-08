import { useAppSelector } from "@/hooks/redux-hook";
export function RealTimePerformance() {
  const { accuracy, wpm, adjustedWpm } = useAppSelector(
    (state) => state.typingSessionPerformance,
  );
  const showPerformance = useAppSelector(
    (state) => state.userSettings.appearance.showPerformanceHUD,
  );

  return showPerformance ? (
    <div className={`text-primary flex justify-end text-2xl`}>
      <div>{adjustedWpm}</div> <div>&nbsp;{accuracy}%</div>
    </div>
  ) : (
    <div className="text-2xl">asdf</div>
  );
}
