import { Icon } from "@/components/ui/icon";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { Editor } from "@tiptap/react";

import useContentItemActions from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Shortcut } from "@/components/ui/shortcut";

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="icon" onClick={actions.handleAdd}>
          <Icon name="Plus" />
        </Button>

        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="GripVertical" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-60 p-2">
            <Button
              onClick={actions.resetTextFormatting}
              variant="ghost"
              className="w-full justify-start px-2 space-x-2"
            >
              <Icon name="RemoveFormatting" />
              <span>Clear formatting</span>
            </Button>

            <Button
              onClick={actions.copyNodeToClipboard}
              variant="ghost"
              className="w-full justify-start px-2 space-x-2"
            >
              <Icon name="Clipboard" />
              <span>Copy to clipboard</span>
            </Button>

            <Button
              onClick={actions.duplicateNode}
              variant="ghost"
              className="w-full justify-start px-2 space-x-2"
            >
              <Icon name="Copy" />
              <span>Duplicate</span>
            </Button>

            <Separator />

            <Button
              onClick={actions.deleteNode}
              variant="ghost"
              className="w-full justify-start px-2 space-x-2"
            >
              <Icon name="Trash2" />
              <span>Delete</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </DragHandle>
  );
};
