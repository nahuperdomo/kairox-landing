"use client";

import { useState } from "react";

interface GlowInputProps {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
}

export default function GlowInput({
  label,
  name,
  type = "text",
  as = "input",
  rows = 5,
  required = false,
}: GlowInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const isActive = focused || value.length > 0;
  const Tag = as;

  return (
    <div className="relative input-glow-border rounded-xl">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-2 text-[10px] text-cyan/80"
            : "top-3.5 text-sm text-white/30"
        }`}
      >
        {label}
      </label>
      <Tag
        id={name}
        name={name}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        required={required}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setValue(e.target.value)
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full ${
          isActive ? "pt-6 pb-2" : "py-3.5"
        } px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-transparent transition-all duration-300 ${
          as === "textarea" ? "resize-none" : ""
        }`}
      />
    </div>
  );
}
