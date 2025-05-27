"use client";

import React, { useState } from "react";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  active?: boolean;
  type?: "button" | "submit" | "reset";
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = "",
  active = false,
  type = "button",
}) => {
  // Handle mouse move for ripple effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  };

  return (
    <button
      type={type}
      className={`ripple-btn ${active ? "active" : ""} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {children}
    </button>
  );
};

export default RippleButton; 