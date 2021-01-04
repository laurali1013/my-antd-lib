import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Icon from './Icon';
import { IconProps } from './Icon';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export default {
    title: 'Example/Laura-Icon',
    component: Icon,
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

const Template: Story<IconProps> = ({ icon, theme,size}) => (
    <Icon
        icon={icon}
        theme={theme}
        size={ size}
    />
);

export const ArrowIcon = Template.bind({});
ArrowIcon.args = {
    icon: 'arrow-down',
    theme: 'danger',
    size:'10x',
};