import React, { FC, createContext, useState } from "react";
import classNames from "classnames";

import { MenuItemProps } from './MenuItem';

//定义Menu的mode模式：横向、纵向
type MenuMode = "horizontal" | "vertical";

//定义MenuProps接口
export interface MenuProps {
    defaultIndex?: number;
    mode?: MenuMode;
    onSelect?: (selectIndex: number) => void;
    className?: string;
    style?: React.CSSProperties;
}

//创建一个context：用于将父组件的属性传递给子组件：即Menu->MenuItem
//1.创建context接口
export interface IMenuContext {
    index: number;
    onSelect?: (selectIndex: number) => void;
    mode?: MenuMode;
}
//2.创建context:接口类型为IMenuContext,病设置默认的index值为0
export const MenuContext = createContext<IMenuContext>({ index: 0 });

//Menu组件
const Menu: FC<MenuProps> = (props) => {
    //获取props
    const { children, defaultIndex, mode, onSelect, className, style } = props;
    //定义active的状态
    const [currentActive, setCurrentActive] = useState(defaultIndex);
    //把class补全
    const classes = classNames("laura-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });

    //需要把父组件的属性传递给子组件
    //select处理函数
    const handleClick = (index: number) => {
        //将选中的index设置为当前的active
        setCurrentActive(index);
        //如果app中调用了onSelect方法，那么则执行onSelect方法
        if (onSelect) {
            onSelect(index);   
        }
    };
    //要传递的context：应该传currentActive的值，如果没有就默认0   
    const passdContext: IMenuContext = {
        //currentActive是通过MenuItem组件的点击事件，将index传递给父组件，然后赋值给currentActive
        //再将currentActive值传递给MenuItem组件，进行类is-active的添加
        index: currentActive?currentActive:0,
        onSelect: handleClick,
        mode,
    };
    /*
    Menu的子组件，不想每次都需要传递index属性，我们希望默认就加上index属性，所以我们不能直接用children,
    我们需要使用cloneElement，这个元素里面默认加上index属性
    */
    //renderChildrenf方法产生一个新的children，有index属性，且我们需要MenuItem的children
    const renderChildren = () => {
        //不能直接使用children.map因为children是一个不透明的属性，里面可以是任何类型的数据
        //所以使用React.Children.map
        return React.Children.map(children, (child, index) => {
            console.log(child);
            
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { name } = childElement.type
            if (name === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }   
    return (
        <ul style={style} className={classes} data-testid="test-menu">
            <MenuContext.Provider value={passdContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal",
};

export default Menu;
