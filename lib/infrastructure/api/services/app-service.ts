import { TimedMode } from "@/model/timed-mode";
import { TimedModeDuration } from "@/model/typing-mode";
import { stringToList } from "@/lib/utils";
export function getTimedTest(duration: number): string[] {
  const text =
    "Giang Trần không thích phân biệt người\n" +
    "            tốt hay người xấu. Đối với anh\n" +
    "            ta, chỉ có những người đồng hành và kẻ thù. Anh ta lập tức triển khai kế hoạch đàn áp kẻ thù và\n" +
    "            nâng cao tầm vóc của những người đồng hành. Mạch truyện với các tình tiết gay cấn và logic đan\n" +
    "            xen lẫn nhau, hứa hẹn mang đến cho độc giả những trải nghiệm đáng nhớ. Kết thúc của truyện của\n" +
    "            Lê Thiên vẫn đầy cảm xúc và sự kiện, khiến độc giả không thể quên được.";
  return stringToList(text);
}

export function getWordsCountTest(count: number): string[] {
  return [];
}

export function getQuoteTest(): string[] {
  return [];
}
