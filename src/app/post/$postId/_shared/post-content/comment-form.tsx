import { useState } from "react";

import { Button } from "~/components/ui";
import { cn } from "~/utils/cn";

export function CommentForm() {
  const [content, setContent] = useState("");
  return (
    <form
      className={cn(
        "bg-field shadow-button-subtle w-full resize-none rounded-md ring-sky-300/10 transition-all",
        "has-[textarea:focus-visible]:ring-4",
        "has-[textarea:hover]:bg-field-hover",
      )}
    >
      <textarea
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Leave a comment..."
        className={cn(
          "w-full resize-none p-2 text-sm font-medium outline-hidden transition-all [&::-webkit-scrollbar]:hidden",
          "placeholder:text-subtle",
        )}
      />
      <div className="flex w-full justify-end p-2">
        <Button.Root data-requires-auth disabled={!content} variant="inverted">
          <Button.Text>Post</Button.Text>
        </Button.Root>
      </div>
    </form>
  );
}
