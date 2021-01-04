import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import classNames from "classnames";

export type ButtonType = "primary" | "danger" | "link" | "default";
export type ButtonSize = 'lg' | 'sm';


interface BaseButtonProps{
    /**
    * 设置Button的className
    */
    className?: string;//设置Button的className
    /**
    * 设置Button的类型:"default"or"primary"or"danger"or"link"
    */
    btnType?: ButtonType;//设置Button的类型
    /**
    * 设置Button的大小:"sm"or"lg"
    */
    size?: ButtonSize;//设置Button的大小
    /**
    * 设置<a>链接的跳转
    */
    href?: string;//设置<a>链接的跳转
    /**
    * 设置禁用Button
    */
    disabled?: boolean;//禁用Button
    /**
    * 设置设置children
    */
    children: React.ReactNode;//设置children
}
//因为要支持原生的一些属性和方法，则需要如下操作：
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//要避免有些属性和方法的唯一性，避免冲突，合并时需要使用Patial
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'laura-component-lib'
 * ~~~
 */
const Button: FC<ButtonProps> = (props) => {
    //把props解构
    const { className, btnType, size, href, disabled, children,...restProps } = props;
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled,
    });
    if (btnType === 'link' && href) {  
        return <a
            className={classes}
            href={href}
            {...restProps}
        >
            {children}</a>
    } else {
        return <button
            className={classes}
            disabled = {disabled}
            {...restProps}
        >
            {children}</button>
    }       
}
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
}


export default Button;