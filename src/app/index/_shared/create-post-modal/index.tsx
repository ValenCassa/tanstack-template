import { Dialog } from "@base-ui-components/react/dialog";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { PropsWithChildren } from "react";
import type z from "zod";

import type { createPostValidator } from "~/actions/posts";
import { createPost as createPostAction } from "~/actions/posts";
import { Button, SegmentedTabs } from "~/components/ui";
import { cn } from "~/utils/cn";
import { BOARD_META } from "~/utils/mappings";

import { Route } from "../../index.page";

function CreatePostModalContent() {
  const navigate = Route.useNavigate();

  const [values, setValues] = useState<z.infer<typeof createPostValidator>>({
    title: "",
    description: "",
    board: "feature_request",
  });

  const { queryClient } = Route.useRouteContext();

  const createPost = useMutation({
    mutationFn: (values: z.infer<typeof createPostValidator>) => {
      return createPostAction({
        data: {
          title: values.title,
          description: values.description,
          board: values.board,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({
        to: "/post/$postId",
        params: {
          postId: data.id,
        },
      });
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createPost.mutate(values);
    },
    [createPost, values],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn({ "animate-pulse": createPost.isPending })}
    >
      <div className="bg-field shadow-button-subtle rounded-md">
        <input
          placeholder="Title"
          className="placeholder:text-subtle block w-full px-3.5 pt-3 pb-2.5 text-[16px] font-medium outline-hidden transition-colors"
          value={values.title}
          onChange={(e) => {
            setValues({ ...values, title: e.target.value });
          }}
        />
        <textarea
          rows={4}
          placeholder="Describe your feedback"
          className="placeholder:text-subtle text-light block w-full resize-none px-3.5 pb-3 text-sm font-medium outline-hidden transition-colors [&::-webkit-scrollbar]:hidden"
          value={values.description}
          onChange={(e) => {
            setValues({ ...values, description: e.target.value });
          }}
        />
      </div>
      <div className="flex items-center justify-between p-2">
        <SegmentedTabs.Root
          value={values.board}
          onValueChange={(value) => {
            setValues({ ...values, board: value });
          }}
        >
          <SegmentedTabs.List className="bg-muted">
            {Object.entries(BOARD_META).map(([boardType, meta]) => {
              return (
                <SegmentedTabs.Item
                  className="not-[[data-selected]]:text-muted"
                  key={boardType}
                  value={boardType}
                >
                  <meta.icon />
                </SegmentedTabs.Item>
              );
            })}
            <SegmentedTabs.Indicator />
          </SegmentedTabs.List>
        </SegmentedTabs.Root>

        <Button.Root
          type="submit"
          variant="inverted"
          disabled={
            !values.title || !values.description || createPost.isPending
          }
        >
          <Button.Text>Create</Button.Text>
        </Button.Root>
      </div>
    </form>
  );
}

export function CreatePostModal({ children }: PropsWithChildren) {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-overlay fixed inset-0 z-[99] transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-[999] grid w-[500px] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-md bg-[#2F2F2F] shadow-xl duration-200">
          <CreatePostModalContent />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
