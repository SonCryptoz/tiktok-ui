import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';

import { Wrapper as PopperWrapper} from '@/components/Popper'
import MenuItem from "./MenuItem";
import Header from "./Header";
import styles from './Menu.module.scss';
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFunc = () => {};

function Menu({ 
                children, 
                items = [], 
                hideOnClick = false, 
                onChange = defaultFunc, 
                ...passProps 
            }){

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
            return <MenuItem 
                        key={index} 
                        data={item} 
                        onClick={() => check(isParent, item.children, item)}/>
        });
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('menu-popper')}>
                    {history.length > 1 && <Header title={current.title} onBack={handleBack}/>}
                    <div className={cx('menu-body')}>
                        {renderItems()}
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    // reset to first menu
    const handleReset = () => {
        setHistory(prev => prev.slice(0, 1));
    };

    return ( 
        <Tippy 
            {...passProps}
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;