import { useState,useEffect } from 'react';
import axios from 'axios';

//下载狗狗图片的hook:url下载地址，deps是副作用依赖（默认是一个空数组）
const useUrlLoader = (url: string, deps: any[] = []) => {
    //定义获取url成功后的数据状态
    const [data, setData] = useState<any>(null);
    //定义加载的状态
    const [loading, setLoading] = useState(false);
    //副作用
    useEffect(() => {
        //正在加载
        setLoading(true);
        //发送请求
        axios.get(url).then(result => {
            //成功后的数据
            setData(result.data);
            //加载完毕
            setLoading(false);
        });
    }, deps);
    return [data, loading];
}

export default useUrlLoader;