import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Input from './Input';
import { InputProps } from './Input';

export default {
    title: 'Laura-Component-Lib/Input',
    component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args}/>;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
    style: { width: '300px' },
    placeholder:'placeholder',
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
    style: { width: '300px' },
    placeholder: 'placeholder',
    disabled:true,
};

export const IconInput = Template.bind({});
IconInput.args = {
    style: { width: '300px' },
    placeholder: 'placeholder',
    icon: 'search',
};

export const SizeInput = Template.bind({});
SizeInput.args = {
    style: { width: '300px' },
    defaultValue: 'large size',
    size: 'lg',
};
