import { Editor, useEditor } from "@tiptap/react";

import { ExtensionKit } from "@/extensions/extension-kit";
import { useSidebar } from "./useSidebar";
import { initialContent } from "@/lib/data/initialContent";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  const leftSidebar = useSidebar();

  const editor = useEditor(
    {
      immediatelyRender: false,
      autofocus: true,
      onCreate: ({ editor }) => {
        editor.commands.setContent(initialContent);
        editor.commands.focus("start", { scrollIntoView: true });
      },
      extensions: [...ExtensionKit()].filter((e) => !!e),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    []
  );

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  // Make sure window is available
  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor, characterCount, leftSidebar };
};
