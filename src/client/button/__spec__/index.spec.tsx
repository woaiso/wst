import * as  React from 'react';
import { mount, render } from 'enzyme';
import Button from '..';


describe('<Button />', () => {
    it('renders one `.button`s', () => {
        const wrapper = render(<Button />);
        expect(wrapper.find('.button').length).toBe(1)
    });

    it('allows us to set button text', () => {
        const wrapper = mount(<Button text="i`m button" />);
        expect(wrapper.props().text).toEqual('i`m button');

        wrapper.setProps({ text: 'i`m primary button' });

        expect(wrapper.props().text).toEqual('i`m primary button');
    })

    it('set none text button', () => {
        const wrapper = mount(<Button />);
        expect(wrapper.props().text).toEqual(undefined);
    })
});
