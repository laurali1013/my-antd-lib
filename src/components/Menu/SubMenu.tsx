import React,{FC,useState,useContext,FunctionComponentElement} from 'react';
import classNames from 'classnames';

import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';

import Icon from './../Icon/Icon';
import MyTransition from '../MyTransition/MyTransition';

//定义SubMenu接口
export interface SubMenuProps{
    //SubMenu的索引
    index?: string;
    //title和Menu下的MenuItem同级别显示
    title: string;
    //类
    className?: string;
}

//主函数
const SubMenu: FC<SubMenuProps> = (props) => {
    //需要使用Menu中的共享内容    //索引index、子组件触发事件onSelect、排列mode、SubMenu默认展开defaultOpenSubMenus
    const context = useContext(MenuContext);
    //title要通过实例传递进来
    const { index, title, className, children } = props;
    //获取展开SubMenu的数组
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    //如果是纵向的，而且有index，就返回true，否则返回false
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    //是否展开SubMenu状态
    const [menuOpen, setMenuOpen] = useState(isOpend);  
    //定义类
    const classes = classNames('menu-item submenu-main', className, {
        'is-active': context.index === index,
        'is-vertical': context.mode === 'vertical',
        'is-opened': menuOpen,
    })
    //纵向点击title展开SubMenu
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    }
    //横向hover进入和离开，展开和隐藏SubMenu
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean)=>{
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => { 
            setMenuOpen(toggle);
        }, 300);
    }
    //纵向点击事件
    const clickEvent = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    //横向hover事件
    const hoverEvent = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {};
    //SubMenu展开的Item要有index属性，需要使用cloneElement
    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', {
            'menu-opened':menuOpen,
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.name === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${i.toString()}`})
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <MyTransition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </MyTransition>

        )
    }
    return (   
        <li key={index} className = {classes} {...hoverEvent}>
        <div className="submenu-title" {...clickEvent}>
            {title}
            <Icon icon='angle-down' className='arrow-icon'/>
        </div>
        {renderChildren()}
        </li>
    )
}

export default SubMenu;
