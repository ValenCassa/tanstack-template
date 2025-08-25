import { Dialog } from "@base-ui-components/react/dialog";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui";
import { clientAuth } from "~/utils/auth/client-auth";

export function LogInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const session = clientAuth.useSession();

  useEffect(() => {
    if (session.data) {
      return;
    }

    const abortController = new AbortController();

    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check if the clicked/pressed element or any of its parents has data-requires-auth
      let element = target;
      while (element && element !== document.body) {
        if (
          element.hasAttribute &&
          element.hasAttribute("data-requires-auth")
        ) {
          e.preventDefault();
          e.stopPropagation();

          setIsOpen(true);
          return;
        }
        element = element.parentElement as HTMLElement;
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle Enter key presses
      if (e.key === "Enter") {
        handleInteraction(e);
      }
    };

    document.addEventListener("click", handleInteraction, {
      signal: abortController.signal,
      capture: true,
    });
    document.addEventListener("keydown", handleKeyPress, {
      signal: abortController.signal,
      capture: true,
    });

    return () => {
      abortController.abort();
    };
  }, [session.data]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-overlay fixed inset-0 z-[99] transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="bg-dialog data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-[999] grid w-[300px] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] space-y-3 overflow-hidden rounded-md p-3 pt-2.5 shadow-xl duration-200">
          <div className="space-y-0.5">
            <Dialog.Title className="text-base text-sm font-medium">
              Log in
            </Dialog.Title>
            <Dialog.Description className="text-subtle text-sm font-medium">
              Log in to your account to continue
            </Dialog.Description>
          </div>
          <Button.Root
            variant="inverted"
            className="w-full justify-center"
            onClick={() => {
              clientAuth.signIn.social({
                provider: "google",
              });
            }}
          >
            <Button.Text>Continue with Google</Button.Text>
          </Button.Root>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
