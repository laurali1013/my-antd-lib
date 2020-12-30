import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';

//定义MenuItemProps的接口
export interface MenuItemProps {
    className?: string;
    index?: string;
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
    const classes = classNames("menu-item", className, {
        //disabled通过MenuItem实例传递过来
        'is-disabled': disabled,
        //如果共享的context中index值和Item组件的index值相等，则active
        'is-active': context.index === index,
    });
    //设置点击回调函数，将index通过context.onSelect传递给父组件
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index ==='string')) {
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