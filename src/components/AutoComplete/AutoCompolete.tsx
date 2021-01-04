/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect } from "react";
import classNames from 'classnames';

import Input, { InputProps } from '../Input/Input';
import Icon from '../Icon/Icon';

import useDebounce from './../../hooks/useDebounce';

//datasource的格式
interface DataSourceObject {
    value: string;
}
//datasource如果有格式就把格式和DataSourceObject混合返回
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    //1.获取props
    const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props;
    //定义state
    const [InputValue, setInputValue] = useState(value as string);
    const [Suggetions, setSuggetions] = useState<DataSourceType[]>([]);
    const [isLoading, setLoading] = useState(false);
    //通过上下键盘，可以选中结果上下移动，并高亮条目
    const [hightlightIndex, setHighlightIndex] = useState(-1);
    const debouncedValue = useDebounce(InputValue, 500);
    //定义副作用：当InputValue变化时，触发副作用
    useEffect(() => {
        //获取下拉列表
        if (debouncedValue) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setSuggetions(data);
                    setLoading(false);
                })
            } else {
                setSuggetions(results);
            }
        } else {
            setSuggetions([]);
        }
    }, [debouncedValue]);
    //3.操作
    //高亮函数
    const HighLight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= Suggetions.length - 1) index = Suggetions.length - 1;
        setHighlightIndex(index);
    }
    //按键按下后的处理函数
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (Suggetions[hightlightIndex]) {
                    handleSelect(Suggetions[hightlightIndex]);
                }
                break;
            case 38:
                HighLight(hightlightIndex - 1);
                break;
            case 40:
                HighLight(hightlightIndex + 1);
                break;
            case 27:
                setSuggetions([]);
                break;
            default: break;
        }

    }
    //实现受控组件:当输入框内容发生变化触发此事件
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //获取value
        const value = e.target.value.trim();
        //更新value
        setInputValue(value);
        //获取下拉列表
        //改为用useEffect方法实现
    }
    //选中下拉列表的item时触发事件
    const handleSelect = (item: DataSourceType) => {
        //更新inputvalue
        setInputValue(item.value);
        //清空suggestions
        setSuggetions([]);
        //调用onSelect方法
        if (onSelect) {
            onSelect(item);
        }
    }
    //自定义模板：如果有自定义模板就使用自定义模板，如果没有就返回item
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }
    //当suggestions不为空，要动态产生一个下拉列表
    const generateDropdown = () => {
        return (
            <ul>
                {Suggetions.map((suggest, index) => {
                    const cnames = classNames('suggestion-item', {
                        'is-active': index === hightlightIndex
                    })
                    return (
                        < li key={index} className={cnames} onClick={() => { handleSelect(suggest) }}> { renderTemplate(suggest)}</li>
                    )

                })
                }
            </ul >            
        ) 
           
    }
return (
    <div className='laura-auto-complete'>
        <Input
            value={InputValue}
            style={{ width: "300px" }}
            {...restProps}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
        {isLoading && <ul><Icon icon='spinner' spin /></ul>}
        { Suggetions && generateDropdown()}
    </div>
)
}