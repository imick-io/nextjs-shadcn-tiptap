import { Icon } from "@/components/ui/icon";
import { EditorInfo } from "./EditorInfo";
import { Toolbar } from "@/components/legacy-ui/Toolbar";

export type EditorHeaderProps = {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  characters: number;
  words: number;
};

export const EditorHeader = ({
  characters,
  words,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? "bg-transparent" : ""}
          >
            <Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeft"} />
          </Toolbar.Button>
        </div>
      </div>
      <EditorInfo characters={characters} words={words} />
    </div>
  );
};
