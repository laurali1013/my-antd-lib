import { FC } from 'react';

interface IHelloProps{
    message?: string;
}
//FC是一个泛型：React.FunctionComponent
//把IHelloProps接口类型添加到泛型中
const Hello: FC<IHelloProps> = (props) => {
  return <h2>{props.message}</h2>;
};

Hello.defaultProps={
    message:'hello world'
}

export default Hello;

