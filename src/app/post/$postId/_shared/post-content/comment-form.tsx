import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { GetPostResponse } from "~/actions/posts";
import { commentPost, getPostQueryOptions } from "~/actions/posts";
import { Button } from "~/components/ui";
import { cn } from "~/utils/cn";

import { Route } from "../../$postId.page";

export function CommentForm() {
  const { postId } = Route.useParams();
  const { queryClient } = Route.useRouteContext();
  const [formState, setFormState] = useState({
    content: "",
  });
  const { mutate: createComment, isPending } = useMutation({
    mutationFn: (content: string) => {
      return commentPost({
        data: {
          postId,
          content,
        },
      });
    },
    onSuccess: (data) => {
      setFormState({
        content: "",
      });
      queryClient.setQueryData(
        getPostQueryOptions(postId).queryKey,
        (old: GetPostResponse) => {
          return {
            ...old,
            comments: [data, ...old.comments],
          };
        },
      );
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createComment(formState.content);
      setFormState({
        content: "",
      });
    },
    [createComment, formState.content],
  );

  return (
    <form
      className={cn(
        "bg-field shadow-button-subtle w-full resize-none rounded-md ring-sky-300/10 transition-all",
        "has-[textarea:focus-visible]:ring-4",
        "has-[textarea:hover]:bg-field-hover",
        { "animate-pulse": isPending },
      )}
      onSubmit={handleSubmit}
    >
      <textarea
        rows={2}
        value={formState.content}
        onChange={(e) =>
          setFormState({
            content: e.target.value,
          })
        }
        placeholder="Leave a comment..."
        className={cn(
          "w-full resize-none p-2 text-sm font-medium outline-hidden transition-all [&::-webkit-scrollbar]:hidden",
          "placeholder:text-subtle",
        )}
      />
      <div className="flex w-full justify-end p-2">
        <Button.Root
          data-requires-auth
          type="submit"
          disabled={!formState.content || isPending}
          variant="inverted"
        >
          <Button.Text>Post</Button.Text>
        </Button.Root>
      </div>
    </form>
  );
}
