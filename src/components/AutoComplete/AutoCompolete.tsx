/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from "react";
import classNames from 'classnames';

import Input, { InputProps } from '../Input/Input';
import Icon from '../Icon/Icon';

import useDebounce from './../../hooks/useDebounce';
import useClickOutside from './../../hooks/useClickOutside';
import { Transition } from "react-transition-group";

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
    const [showDropdown, setShowDropdown] = useState(false)
    const [isLoading, setLoading] = useState(false);
    //通过上下键盘，可以选中结果上下移动，并高亮条目
    const [hightlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    //指向div元素的节点
    const compnentRef = useRef<HTMLDivElement>(null);
    const debouncedValue = useDebounce(InputValue, 500);
    useClickOutside(compnentRef, () => { setSuggetions([]) });
    //定义副作用：当InputValue变化时，触发副作用
    useEffect(() => {
        //获取下拉列表
        if (debouncedValue && triggerSearch.current === true) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setSuggetions(data);
                    setLoading(false);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                })
            } else {
                setSuggetions(results);
                setShowDropdown(true);
            }
        } else {
            setSuggetions([]);
            setShowDropdown(false);
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
                setShowDropdown(false);
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
        triggerSearch.current = true;
        //改为用useEffect方法实现
    }
    //选中下拉列表的item时触发事件
    const handleSelect = (item: DataSourceType) => {
        //更新inputvalue
        setInputValue(item.value);
        setShowDropdown(false);
        //清空suggestions
        setSuggetions([]);
        //调用onSelect方法
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    }
    //自定义模板：如果有自定义模板就使用自定义模板，如果没有就返回item
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }
    //当suggestions不为空，要动态产生一个下拉列表
    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || isLoading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSuggetions([]) }}
            >
                <ul className='suggestion-list'>
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
            </Transition>
                        
        ) 
           
    }
return (
    <div className='laura-auto-complete' ref = {compnentRef}>
        <Input
            value={InputValue}
            style={{ width: "300px" }}
            {...restProps}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
        {isLoading && <div className='suggestions-loading-icon'><Icon icon='spinner' spin /></div>}
        { Suggetions && generateDropdown()}
    </div>
)
}