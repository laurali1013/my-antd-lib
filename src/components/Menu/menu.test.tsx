import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
//创建一个函数产生一个测试的组件
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
        </Menu>
    )
}
//测试属性
const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className:'test'
}
//测试vertical属性
const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode:'vertical',
}

//定义共有变量
let wrapper: RenderResult, disabledElement: HTMLElement, activeElement: HTMLElement, menuElement: HTMLElement;
describe('test menu', () => {
    //把变量放到beforeEach()在每次测试都会执行
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');   
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        //测试Menu在文档流中
        expect(menuElement).toBeInTheDocument();
        //测试有menu类
        expect(menuElement).toHaveClass('laura-menu test');
        //测试子组件个数为3
        expect(menuElement.querySelectorAll(':scope>li').length).toEqual(3);
        //测试active的组件有对应的class
        expect(activeElement).toHaveClass('menu-item is-active');
        //测试disabled的组件有对应的class
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })
    it('click item should change active and call the right callback', () => {
        //测试点击xyz，active类会出现在xyz的元素上
        const thirdItem = wrapper.getByText('xyz');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        //active类会从第一个元素上消失
        expect(activeElement).not.toHaveClass('is-active');
        //onSelect会调用2
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        //测试点击disabled元素，不会添加is-active属性
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        //onSelect不会调用1
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    })
    it('test Menu and MenuItem component in vertiacal mode', () => {
        //每个case之后都会进行cleanup
        //wrapper在beforeEach中渲染了一遍，如果需要重新渲染，需要cleanUp
        //修改mode,先cleanUp一下，否则会冲突
        cleanup();
        const wrapper = render(generateMenu(testVerProps));
        const menuElement = wrapper.getByTestId('test-menu');
        //查看classname是否有vertical类
        expect(menuElement).toHaveClass('menu-vertical');
    })
})


