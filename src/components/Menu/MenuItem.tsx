import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';

//定义MenuItemProps的接口
export interface MenuItemProps {
    className?: string;
    index?: number;
    style?: React.CSSProperties;
    disabled?: boolean;
}

//组件
const MenuItem: FC<MenuItemProps> = (props) => {
    //获取props
    const { index, children, className, style, disabled } = props;
    //获取父组件传递过来的属性
    const context = useContext(MenuContext);
    //设置className:当父组件传递的index和子组件自身的index相等的时候，需要添加class类is-active
    console.log(context);
    console.log(index);
    
    
    const classes = classNames("menu-item", className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    //设置点击回调函数，将index通过context.onSel
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index ==='number')) {
            context.onSelect(index);
        }
    }
    return (
        <li style={style} className={classes} onClick={handleClick}>
            {children}
        </li>
    );
};

export default MenuItem;