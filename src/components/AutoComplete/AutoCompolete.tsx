/* eslint-disable react-hooks/exhaustive-deps */
import React,{FC,useState,ChangeEvent, ReactElement ,useEffect} from "react";
import Input, { InputProps } from '../Input/Input';
import Icon from '../Icon/Icon';

import useDebounce from './../../hooks/useDebounce';

//datasource的格式
interface DataSourceObject{
    value: string;
}
//datasource如果有格式就把格式和DataSourceObject混合返回
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[] >;
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
                {Suggetions.map((suggest, index) => (
                    <li key={index} onClick={() => { handleSelect(suggest) }}>{renderTemplate(suggest)}</li>
                ))}
            </ul>
        )
    }
    return (
        <div className='laura-auto-complete'>
            <Input value={InputValue} style={{width:"300px"}} {...restProps} onChange={handleChange} />
            {isLoading && <ul><Icon icon='spinner' spin/></ul>}
            { Suggetions && generateDropdown()}
        </div>
    )
}