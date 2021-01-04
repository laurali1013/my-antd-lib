import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Button from './Button';


export default {
    title: 'Laura-Component-Lib/Button',
    component: Button,
    //用于装饰story
    //decorators: [(Story) => <div style={{ margin: '1em 2em' }}><Story /></div>]
    parameters: {
        // info: TableComponent,
    },
} as Meta;


export const DifferentTypeButton = () => (
    <>
        <Button btnType='default' onClick={action('defaultButton-click')}>Default</Button>
        <Button btnType='primary' onClick={action('primaryButton-click')}>Primary</Button>
        <Button btnType='danger' onClick={action('dangerButton-click')}>Danger</Button>
        <Button btnType='link' onClick={action('linkButton-click')}>Link</Button>
    </>
)

export const DifferentSizeButton = () => (
    <>
        <Button size='lg' btnType='primary' onClick={action('lgButton-click')}>Large</Button>
        <Button size='sm' btnType='primary' onClick={action('smButton-click')}>Small</Button>
    </>
)
