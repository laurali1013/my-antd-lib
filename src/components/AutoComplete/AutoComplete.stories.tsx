import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import {AutoComplete,DataSourceType} from './AutoCompolete';

export default {
    title: 'Laura-Component-Lib/AutoComplete',
    component: AutoComplete,
} as Meta;


interface LakerPlayerProps{
    value: string;
    number: number;
}
const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];

// const lakersWithNumber = [
//     {value: 'bradley', number: 11},
//     {value: 'pope', number: 1},
//     {value: 'caruso', number: 4},
//     {value: 'cook', number: 2},
//     {value: 'cousins', number: 15},
//     {value: 'james', number: 23},
//     {value: 'AD', number: 3},
//     {value: 'green', number: 14},
//     {value: 'howard', number: 39},
//     {value: 'kuzma', number: 0},
// ]

const handleFetch = (queryItem:string) => {
    return lakers.filter(name => name.includes(queryItem)).map(name=>({value:name}));
}

// const handleFetch = (queryItem: string) => {
//     return lakersWithNumber.filter(name => name.value.includes(queryItem));
// }

const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    return (
        <>
            <h2>{item.value}</h2>
            <p>{item.number}</p>
        </>
    )
}

export const defaultAutoComplete = () => (
    <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action('onSelect')}
        renderOption={renderOption}
    />
)