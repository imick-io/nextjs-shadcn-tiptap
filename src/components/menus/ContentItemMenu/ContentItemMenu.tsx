import { Icon } from "@/components/legacy-ui/Icon";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { Editor } from "@tiptap/react";

import useContentItemActions from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="GripVertical" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={actions.resetTextFormatting}>
                <Icon name="RemoveFormatting" className="mr-2" />
                <span>Clear formatting</span>
                <DropdownMenuShortcut>⌘+B</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={actions.copyNodeToClipboard}>
                <Icon name="Clipboard" className="mr-2" />
                <span>Copy to clipboard</span>
                <DropdownMenuShortcut>⌘+B</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={actions.duplicateNode}>
                <Icon name="Copy" className="mr-2" />
                <span>Duplicate</span>
                <DropdownMenuShortcut>⌘+B</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={actions.deleteNode}>
                <Icon name="Trash2" className="mr-2" />
                <span>Delete</span>
                <DropdownMenuShortcut>⌘+B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DragHandle>
  );
};
