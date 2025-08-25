import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import { ProgressCircle0Of4 } from "~/components/icons";
import { ChevronRightIcon } from "~/components/icons/chevron-right-icon";
import { ReactIcon } from "~/components/icons/react-icon";
import { Avatar, Button, Tabs } from "~/components/ui";
import { clientAuth } from "~/utils/auth/client-auth";

function NavbarOrganization() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-2">
        <ProgressCircle0Of4 className="size-5 text-base" />
        <ChevronRightIcon className="text-muted size-4" />
      </div>

      <div className="flex items-center gap-2">
        <span className="bg-subtle inline-grid size-5 place-content-center rounded-md">
          <ReactIcon className="size-3" />
        </span>
        <p className="font-medium">React</p>
      </div>
    </div>
  );
}

function NavbarUser() {
  const { data, isPending } = clientAuth.useSession();

  return (
    <AnimatePresence>
      {!isPending ? (
        <motion.div
          key={data?.user?.id}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center gap-2"
        >
          <Button.Root
            variant="ghost"
            render={
              <a
                href="https://x.com/_cassarino_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button.Text>Follow me on X</Button.Text>
              </a>
            }
          />
          {data?.user ? (
            <Button.Root variant="subtle" onClick={() => clientAuth.signOut()}>
              <Avatar.Root className="grid w-fit place-content-center pr-1 pl-0.5">
                <Avatar.Image
                  src={data?.user.image ?? ""}
                  className="!size-3.5"
                />
                <Avatar.Fallback />
              </Avatar.Root>
              <Button.Text>Log out</Button.Text>
            </Button.Root>
          ) : (
            <Button.Root data-requires-auth variant="subtle">
              <Button.Text>Log in</Button.Text>
            </Button.Root>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SoonBadge() {
  return (
    <span className="bg-badge-yellow text-badge-yellow flex h-5 items-center rounded-full px-2 text-xs font-medium">
      Soon
    </span>
  );
}

function NavbarTabs() {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <Tabs.Root value={pathname}>
      <Tabs.List>
        <Tabs.Item
          value="/"
          render={
            <Link to="/">
              <Tabs.ItemContent>Feedback</Tabs.ItemContent>
            </Link>
          }
        />

        <Tabs.Item
          value="/roadmap"
          render={
            <Link to="/roadmap">
              <Tabs.ItemContent>Roadmap</Tabs.ItemContent>
            </Link>
          }
        />

        <Tabs.Item value="/changelog" disabled>
          <Tabs.ItemContent>
            Changelog <SoonBadge />
          </Tabs.ItemContent>
        </Tabs.Item>

        <Tabs.Item value="/help-center" disabled>
          <Tabs.ItemContent>
            Help Center <SoonBadge />
          </Tabs.ItemContent>
        </Tabs.Item>
      </Tabs.List>
    </Tabs.Root>
  );
}

export function AppNavbar() {
  return (
    <div className="bg-navbar border-base z-10 w-full border-b px-4">
      <div className="max-w-app mx-auto w-full">
        <div className="flex h-[70px] items-center justify-between pt-0.5">
          <NavbarOrganization />
          <NavbarUser />
        </div>

        <NavbarTabs />
      </div>
    </div>
  );
}
