import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./Button";

test("our first react test case", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice");
  expect(element).toBeTruthy();
});

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button Component", () => {
  it("should render the correct default button", () => {
    //渲染一个button组件到dom树
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    //获取该组件
    const element = wrapper.queryByText("Nice") as HTMLButtonElement;
    //1.该组件要在dom中
    expect(element).toBeInTheDocument();
    //2.该组件要是button组件
    expect(element.tagName).toEqual("BUTTON");
    //3.该组件不应该被disabled
    expect(element.disabled).toBeFalsy();
    //4.该组件要有类名
    expect(element).toHaveClass("btn btn-default");
    //5.改组将要能实现click事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {
    //渲染一个button组件到dom树
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    //获取该组件
    const element = wrapper.queryByText("Nice");
    //1.该组件要在dom中
    expect(element).toBeInTheDocument();
    //2.该组件要有类名
    expect(element).toHaveClass("btn-primary btn-lg klass");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    //渲染一个button组件到dom树
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com">
        Link
      </Button>
    );
    //获取该组件
    const element = wrapper.queryByText("Link") as HTMLElement;
    //1.该组件要在dom中
    expect(element).toBeInTheDocument();
    //2.该组件要有类名
    expect(element).toHaveClass("btn btn-link");
    //3.该组件应该是一个a标签
    expect(element.tagName).toEqual("A");
  });
  it("should render disabled button when disabled set to true", () => {
    //渲染一个button组件到dom树
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    //获取该组件
    const element = wrapper.queryByText("Nice") as HTMLButtonElement;
    //1.该组件要在dom中
    expect(element).toBeInTheDocument();
    //2.该组件要disabled
    expect(element.disabled).toBeTruthy();
    //3.该组件的click事件失效
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
