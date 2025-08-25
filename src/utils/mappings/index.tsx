import {
  BugIcon,
  CircleQuestionIcon,
  GaugeIcon,
  LightBulbIcon,
  NotebookIcon,
} from "~/components/icons";
import type { BoardType } from "~/utils/db/schema/posts/schema";

interface BoardMeta {
  label: string;
  icon: typeof LightBulbIcon;
}
export const BOARD_META: Record<BoardType, BoardMeta> = {
  feature_request: {
    label: "Feature Request",
    icon: LightBulbIcon,
  },
  bug: {
    label: "Bug",
    icon: BugIcon,
  },
  question: {
    label: "Q&A",
    icon: CircleQuestionIcon,
  },
  performance: {
    label: "Performance",
    icon: GaugeIcon,
  },
  documentation: {
    label: "Documentation",
    icon: NotebookIcon,
  },
};
