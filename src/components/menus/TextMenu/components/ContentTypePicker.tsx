import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerOption => option.type === "option";
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerCategory => option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === "option" && option.isActive()),
    [options]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={
            activeItem?.id !== "paragraph" && !!activeItem?.type
              ? "secondary"
              : "ghost"
          }
        >
          <Icon
            name={
              (activeItem?.type === "option" && activeItem.icon) || "Pilcrow"
            }
          />
          <Icon name="ChevronDown" className="w-2 h-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent withPortal={false}>
        {options.map((option) => {
          if (isOption(option)) {
            return (
              <DropdownMenuItem
                key={option.id}
                onClick={option.onClick}
                isActive={option.isActive()}
              >
                <Icon name={option.icon} className="mr-1" />
                {option.label}
              </DropdownMenuItem>
            );
          } else if (isCategory(option)) {
            return (
              <>
                <DropdownMenuLabel key={option.id}>
                  {option.label}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
