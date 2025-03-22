import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="language-selector flex items-center gap-2">
      <span className="font-medium">{t("navbar.language")}: </span>
      <Select.Root value={language} onValueChange={changeLanguage}>
        <Select.Trigger
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring inline-flex h-9 w-[130px] items-center justify-between gap-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Language"
        >
          <Select.Value />
          <Select.Icon className="h-4 w-4 opacity-50">
            <ChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="bg-popover animate-in fade-in-80 z-50 overflow-hidden rounded-md border shadow-md"
            position="popper"
            sideOffset={5}
          >
            <Select.ScrollUpButton className="bg-popover flex h-6 cursor-default items-center justify-center">
              <ChevronUp className="h-4 w-4" />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              <Select.Group>
                <Select.Item
                  value="en"
                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative flex h-9 cursor-default select-none items-center rounded-sm px-8 text-sm outline-none"
                >
                  <Select.ItemText>English</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item
                  value="hi"
                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative flex h-9 cursor-default select-none items-center rounded-sm px-8 text-sm outline-none"
                >
                  <Select.ItemText>हिंदी</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="bg-popover flex h-6 cursor-default items-center justify-center">
              <ChevronDown className="h-4 w-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default LanguageSelector;
