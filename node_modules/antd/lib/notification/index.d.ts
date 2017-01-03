/// <reference types="react" />
import React from 'react';
export interface ArgsProps {
    message: React.ReactNode | string;
    description: React.ReactNode | string;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
}
export interface ConfigProps {
    top?: number;
    duration?: number;
}
declare const api: {
    success?(args: ArgsProps): void;
    error?(args: ArgsProps): void;
    info?(args: ArgsProps): void;
    warn?(args: ArgsProps): void;
    warning?(args: ArgsProps): void;
    open(args: ArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
};
export default api;
