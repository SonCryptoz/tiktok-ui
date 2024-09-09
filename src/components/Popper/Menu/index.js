import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper} from '@/components/Popper'
import MenuItem from "./MenuItem";
import Header from "./Header";
import styles from './Menu.module.scss';
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFunc = () => {};

function Menu({ children, items = [], onChange = defaultFunc }){

    const [history, setHistory] = useState([
        {
            data: items,
        }
    ]);

    const current = history[history.length - 1];

    const check = (isParent, itemChildren, item) => {
        if(isParent){
            setHistory(prev => [...prev, itemChildren]);
        }
        else{
            onChange(item);
        }
    }

    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1));
    }

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; // convert boolean kiểm tra xem có prop children không
            return <MenuItem key={index} data={item} onClick={() => check(isParent, item.children, item)}/>
        }
        );
    };

    return ( 
        <Tippy 
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            placement="bottom-end"
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title="Language" onBack={handleBack}/>}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;