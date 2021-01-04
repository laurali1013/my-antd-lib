import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
// import {
//     ArgsTable,
//     Stories,
//     PRIMARY_STORY,
// } from '@storybook/addon-docs/blocks';

import Input from './Input';
import { InputProps } from './Input';

export default {
    title: 'Laura-Component-Lib/Input',
    component: Input,
    argTypes: {
    },
    parameters: {
        docs: {
            source: {
                type: 'code',
                code: 'hello'
            },
            // page: () => (
            //     <>
            //         <h1>Input组件</h1>
            //         <p>样式如下</p>
            //         <p>引用方法</p>
            //         <code>import Input from 'laura-components-lib</code>
            //         <ArgsTable story={PRIMARY_STORY} />
            //         <Stories />
            //     </>
            // )
        }
    }
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
