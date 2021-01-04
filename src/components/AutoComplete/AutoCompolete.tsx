import React,{FC,useState,ChangeEvent, ReactElement} from "react";
import Input, { InputProps } from '../Input/Input';

//datasource的格式
interface DataSourceObject{
    value: string;
}
//datasource如果有格式就把格式和DataSourceObject混合返回
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[];
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    //1.获取props
    const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props;
    //定义state
    const [InputValue, setInputValue] = useState('');
    const [Suggetions, setSuggetions] = useState<DataSourceType[]>([]);
    //2.classes
    //3.操作
    //实现受控组件:当输入框内容发生变化触发此事件
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //获取value
        const value = e.target.value.trim();
        //更新value
        setInputValue(value);
        //获取下拉列表
        if (value) {
            const results = fetchSuggestions(value);
            setSuggetions(results);
        } else {
            setSuggetions([]);
        }
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
            { Suggetions && generateDropdown()}
        </div>
    )
}