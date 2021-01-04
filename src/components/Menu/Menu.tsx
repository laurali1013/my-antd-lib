import React, { FC, createContext, useState } from "react";
import classNames from "classnames";

import { MenuItemProps } from './MenuItem';

//定义Menu的mode模式：横向、纵向
type MenuMode = "horizontal" | "vertical";

//定义MenuProps接口
export interface MenuProps {
    /**
    * 设置索引
    */
    defaultIndex?: string;
    /**
    * 设置模式："horizontal" or "vertical"
    */
    mode?: MenuMode; 
    /**
    * 设置选中事件
    */
    onSelect?: (selectIndex: string) => void;
    /**
    * 设置类名
    */
    className?: string;
    /**
    * 设置类名
    */
    style?: React.CSSProperties;
    /**
    * 设置默认打开的SubMenu
    */
    defaultOpenSubMenus?: string[];
}

export interface IMenuContext {
    //创建一个context：用于将父组件的属性传递给子组件：即Menu->MenuItem，SubMenu
    //1.创建context接口
    //索引
    index: string;
    //选中子组件触发事件
    onSelect?: (selectIndex: string) => void;
    //横向或者纵向排列
    mode?: MenuMode;
    //有哪些SubMenu是默认展开的
    defaultOpenSubMenus?:string[]
}
//2.创建context:接口类型为IMenuContext,病设置默认的index值为0
export const MenuContext = createContext<IMenuContext>({ index: '0' });

/**
 * 页面中常用的的菜单元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from 'laura-component-lib'
 * import { MenuItem } from 'laura-component-lib'
 * import { SubMenu } from 'laura-component-lib'
 * ~~~
 */
const Menu: FC<MenuProps> = (props) => {
    //获取props
    const { children, defaultIndex, mode, onSelect, className, style, defaultOpenSubMenus } = props;
    //定义active的状态
    const [currentActive, setCurrentActive] = useState(defaultIndex);
    //class类
    const classes = classNames("laura-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });

    //需要把父组件的属性传递给子组件
    //select处理函数
    const handleClick = (index: string) => {
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
        index: currentActive?currentActive:'0',
        onSelect: handleClick,
        mode,
        //将要打开的SubMenu组件传递给子组件，子组件做展开使用
        defaultOpenSubMenus,
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
            //获取element
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            //找到MenuItem和SubMenu的子组件，其他组件就报错
            const { name } = childElement.type
            if (name === 'MenuItem' || name === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index:index.toString()
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
    defaultIndex: '0',
    mode: "horizontal",
    defaultOpenSubMenus:[]
};

export default Menu;
