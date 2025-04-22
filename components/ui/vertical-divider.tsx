import React from "react";

interface VerticalDividerProps {
  height?: number;
  width?: number;
  color?: string;
  className?: string;
}

export default function VerticalDivider({
  height = 20,
  width = 2,
  color,
  className = "",
}: VerticalDividerProps) {
  return <div className={`${color} ${className}`} style={{ width, height }} />;
}
