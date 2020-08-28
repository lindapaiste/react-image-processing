import React from "react";

export type CanvasRef = React.RefObject<HTMLCanvasElement>;

export interface PickedColor {
    x: number;
    y: number;
    r: number; // radius
    hex: string;
    rgba: number[];
}

export interface SizedImage {
    source_url: string;
    width: number;
    height: number;
}
