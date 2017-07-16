import * as React from 'react';


interface ButtonProps {

	/**
     * 按钮文本
     *
     * @type {string}
     * @memberOf ButtonProps
     */
	text?: string
}

/**
 *
 *
 * @export
 * @class Button
 * @extends {React.Component<any, any>}
 */
export default class Button extends React.Component<ButtonProps, any> {
	/**
     *
     *
     * @returns
     *
     * @memberOf Button
     */
	render() {
		const { text } = this.props;
		return (
			<div>
				<button className="button">{ text }</button>
			</div>
		)
	}
}
