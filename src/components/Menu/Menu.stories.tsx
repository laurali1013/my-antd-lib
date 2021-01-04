import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { MenuProps } from './Menu';

export default {
    title: 'Laura-Component-Lib/Menu',
    component: Menu,
    argTypes: {
    },
    parameters: {
        // docs: {
        //     source: {
        //         type: 'code',
        //         // code: 'hello'
        //     },
        // }
    }
} as Meta;

const Template: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <MenuItem>MenuItem1</MenuItem>
        <MenuItem>MenuItem2</MenuItem>
        <MenuItem>MenuItem3</MenuItem>
        <SubMenu title="SubMenu4">
            <MenuItem>SumMenuItem1</MenuItem>
            <MenuItem>SumMenuItem2</MenuItem>
            <MenuItem>SumMenuItem3</MenuItem>
        </SubMenu>
    </Menu>
);

export const HorMenu = Template.bind({});
HorMenu.args = {
    mode: 'horizontal',
    defaultIndex: '0',
    defaultOpenSubMenus:['2']
};

export const verMenu = Template.bind({});
verMenu.args = {
    mode: 'vertical',
    defaultIndex: '0',
    defaultOpenSubMenus: ['2']
};
