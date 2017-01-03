/// <reference types="react" />
import React from 'react';
export default class Item extends React.Component<any, any> {
    shouldComponentUpdate(...args: any[]): any;
    matchFilter: (text: any) => any;
    render(): JSX.Element | null;
}
