"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon, MinusIcon } from "lucide-react";
import { useId } from "react";
import Image from "next/image";
import { Separator } from "./separator";

export function Preferences() {
  const { setTheme } = useTheme();

  const accentColors = [
    {
      value: "blue",
      color: "#3B82F6",
      label: "Blue",
    },
    {
      value: "purple",
      color: "#8B5CF6",
      label: "Purple",
    },
    {
      value: "pink",
      color: "#EC4899",
      label: "Pink",
    },
    {
      value: "orange",
      color: "#F97316",
      label: "Orange",
    },
  ];

  const [selectedColor, setSelectedColor] = useState(accentColors[0]?.value);

  const handleColorSelect = (value: string) => {
    setSelectedColor(value);
    // You can add additional logic here to persist the selection
  };

  const items = [
    {
      value: "1",
      label: "Light",
      image: "/ui-light.png",
      onclick: () => {
        setTheme("light");
      },
      selected: useTheme().theme === "light",
    },
    {
      value: "2",
      label: "Dark",
      image: "/ui-dark.png",
      onclick: () => {
        setTheme("dark");
      },
      selected: useTheme().theme === "dark",
    },
    {
      value: "3",
      label: "System",
      image: "/ui-system.png",
      onclick: () => {
        setTheme("system");
      },
      selected: useTheme().theme === "system",
    },
  ];
  const id = useId();
  return (
    <div className="absolute right-5 bottom-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-5 p-4">
          <div>
            <h1 className="font-medium">Appearance</h1>
            <p className="text-[12px] opacity-40">
              Set or customize your preferences for the website
            </p>
          </div>
          <Separator />
          <div>
            <h1 className="text-sm">Interface theme</h1>
            <p className="text-[12px] opacity-40">
              Customize your interface theme
            </p>
          </div>
          <RadioGroup className="flex gap-3">
            {items.map((item) => (
              <label key={`${id}-${item.value}`}>
                <RadioGroupItem
                  id={`${id}-${item.value}`}
                  value={item.value}
                  className="peer sr-only after:absolute after:inset-0"
                  onClick={item.onclick}
                />
                <Image
                  src={item.image}
                  alt={item.label}
                  width={88}
                  height={70}
                  className="border-input peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent relative cursor-pointer overflow-hidden rounded-md border shadow-xs transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px] peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50"
                />

                <span className="group mt-2 flex items-center gap-1">
                  <CheckIcon
                    size={16}
                    className={`${item.selected ? "block" : "hidden"}`}
                    aria-hidden="true"
                  />
                  <MinusIcon
                    size={16}
                    className={`${!item.selected ? "block" : "hidden"}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
          <Separator />
          <div className="flex flex-row items-center gap-16">
            <div>
              <h1 className="text-sm">Accent color</h1>
              <p className="text-[12px] opacity-40">
                Pick your interface main color
              </p>
            </div>
            <div className="flex gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className={`h-4 w-4 rounded-full ${selectedColor === color.value ? "ring-2 ring-gray-400 ring-offset-2" : ""} `}
                  style={{ backgroundColor: color.color }}
                  aria-label={`Select ${color.label} accent color`}
                />
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
