import React from 'react';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';

import { AutoCompleteProps, AutoComplete} from './AutoCompolete'

const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
];

const testProps: AutoCompleteProps = {
    fetchSuggestions: (querys) => { return testArray.filter(item => item.value.includes(querys)) },
    onSelect: jest.fn(),
    placeholder:'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps} />)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    }) 
    it('test basic AutoComplete behavior', async () => {
        //点击change输入发生变化
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await waitFor(() => expect(wrapper.queryByText('ab')).toBeInTheDocument());
        //应该有两个检索到的item结果
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);
        //点击第一个item，会发生调用，然后item消失
        fireEvent.click(wrapper.getByText('ab'));
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
        //输入值改变
        expect(inputNode.value).toBe('ab');
    })
    it('should provide keyboard support', async() => {
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await waitFor(() => expect(wrapper.queryByText('ab')).toBeInTheDocument());
        const firstResult = wrapper.queryByText('ab');
        const secondResult = wrapper.queryByText('abc');
        //键盘向下按键按下
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(firstResult).toHaveClass('is-active');
        //键盘向下按键按下
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(secondResult).toHaveClass('is-active');
        //键盘向上按键按下
        fireEvent.keyDown(inputNode, { keyCode: 38 });
        expect(firstResult).toHaveClass('is-active');
        //键盘enter按键按下
        fireEvent.keyDown(inputNode, { keyCode: 13 });
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();      
    })
    it('click outside should hide the dropdown', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('renderOption should generate the right template', () => {

    })
    it('async fetchSuggestions should works fine', () => {

    })
})