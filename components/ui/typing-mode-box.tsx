import Tile from "@/components/ui/tile";
import { TimeIcon } from "@/public/assets/icons/time";
import { PopularIcon } from "@/public/assets/icons/popular";
import { QuoteIcon } from "@/public/assets/icons/quote";
import { RelaxIcon } from "@/public/assets/icons/relax";
import VerticalDivider from "@/components/ui/vertical-divider";
import { LessonIcon } from "@/public/assets/icons/lesson";
import { ModeLevel } from "@/components/ui/mode-level";

type Props = {
  visability?: boolean;
};
export default function TypingModeBox({ visability }: Props) {
  return (
    <div
      className={`flex flex-wrap justify-center ${visability ? "visible" : "invisible"} `}
    >
      <Tile title="thời gian" icon={<TimeIcon />} />
      <Tile title="phổ biến" icon={<PopularIcon />} />
      <Tile title="trích dẫn" icon={<QuoteIcon />} />
      <Tile title="tự do" icon={<RelaxIcon />} />
      <VerticalDivider height={40} width={3} className={"mx-2 bg-gray-900"} />
      <Tile icon={<LessonIcon />} title={"bài học"} />
      <VerticalDivider height={40} width={3} className={"mx-2 bg-gray-900"} />
      <ModeLevel levels={["30s", "60s", "90s"]} />
    </div>
  );
}
