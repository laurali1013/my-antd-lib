import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import MyTransition from './MyTransition';
import { TransitionProps } from './MyTransition';


export default {
    title: 'Example/Laura-MyTransition',
    component: MyTransition,
    argTypes: {
    },
    parameters: {
        docs: {
            source: {
                type: 'code',
                // code: 'hello'
            },
        }
    }
} as Meta;

let show: boolean = true;
const Template: Story<TransitionProps> = ({...args}) => (
    <MyTransition {...args}>
        <>
            <button onClick={() => {show = !show}}>change</button>
            {show === true ? <p>show</p> : <p>disappear</p>}
        </>
    </MyTransition>
);

export const ZoomInTop = Template.bind({});
ZoomInTop.args = {
    in:show,
    timeout:300,
    animation:"zoom-in-top"
};