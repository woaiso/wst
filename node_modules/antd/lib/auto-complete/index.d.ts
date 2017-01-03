/// <reference types="react" />
import React from 'react';
import { OptionProps, OptGroupProps } from '../select';
export interface SelectedValue {
    key: string;
    label: React.ReactNode;
}
export interface DataSourceItemObject {
    value: string;
    text: string;
}
export declare type DataSourceItemType = string | DataSourceItemObject;
export interface AutoCompleteProps {
    size?: 'large' | 'small' | 'default';
    className?: string;
    notFoundContent?: Element;
    dataSource: DataSourceItemType[];
    prefixCls?: string;
    transitionName?: string;
    optionLabelProp?: string;
    choiceTransitionName?: string;
    showSearch?: boolean;
    defaultValue?: string | Array<any> | SelectedValue | Array<SelectedValue>;
    value?: string | Array<any> | SelectedValue | Array<SelectedValue>;
    allowClear?: boolean;
    onChange?: (value: string | Array<any> | SelectedValue | Array<SelectedValue>) => void;
    disabled?: boolean;
}
export default class AutoComplete extends React.Component<AutoCompleteProps, any> {
    static Option: React.ClassicComponentClass<OptionProps>;
    static OptGroup: React.ClassicComponentClass<OptGroupProps>;
    static defaultProps: {
        prefixCls: string;
        transitionName: string;
        optionLabelProp: string;
        choiceTransitionName: string;
        showSearch: boolean;
    };
    static contextTypes: {
        antLocale: React.Requireable<any>;
    };
    render(): JSX.Element;
}
