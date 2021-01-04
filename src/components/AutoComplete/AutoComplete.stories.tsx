import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import {AutoComplete,DataSourceType} from './AutoCompolete';

export default {
    title: 'Laura-Component-Lib/AutoComplete',
    component: AutoComplete,
} as Meta;


// interface LakerPlayerProps{
//     value: string;
//     number: number;
// }

interface GithubUserProps{
    login: string;
    url: string;
    avatar_url: string;
}
// const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];

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

// const handleFetch = (queryItem:string) => {
//     return lakers.filter(name => name.includes(queryItem)).map(name=>({value:name}));
// }

// const handleFetch = (queryItem: string) => {
//     return lakersWithNumber.filter(name => name.value.includes(queryItem));
// }
const handleFetch = (queryItem: string) => {
    return fetch(`https://api.github.com/search/users?q=${queryItem}`)
        .then(res => res.json())
        .then(({ items }) => {
            console.log(items);
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
        })
}
// const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
//     return (
//         <>
//             <h2>{item.value}</h2>
//             <p>{item.number}</p>
//         </>
//     )
// }
const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
        <>
            <h2>Name:{itemWithGithub.value}</h2>
            <p>url:{itemWithGithub.url}</p>
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