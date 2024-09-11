import { useState, useEffect, useRef } from "react";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper } from "@/components/Popper";
import AccountItem from "@/components/AccountItem";
import { SearchIcon } from "@/components/Icons";
import { useDebounce } from "@/hooks";
import * as searchService from '@/services/searchService';

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();
    
    useEffect(() => {

        if(!debounced.trim()){ // nếu là chuỗi rỗng và tab rỗng
            setSearchResult([]);
            return;
        }

        setLoading(true);

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })
        //     .catch(() => setLoading(false));


        // using promise
        // request.get('users/search', {
        //     params: {
        //         q: debounced,
        //         type: 'less',
        //     }
        // })
        //     .then(res => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })
        //     .catch(() => setLoading(false));


        // using async/await
        const fetchAPI = async () => {
            const result = await searchService.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };

        fetchAPI();

    }, [debounced]);
    
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if(searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(searchValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        // using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context
        <div>
            <HeadlessTippy
                interactive
                visible={searchResult.length > 0 && showResult}
                render={(attrs) => (
                    <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx("search-title")}>Accounts</h4>
                            <div className={cx('account-body')}>
                                {searchResult.map((result) => (
                                    <AccountItem key={result.id} data={result}/>
                                ))}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx("search")}>
                    <input 
                        ref={inputRef} 
                        value={searchValue}
                        placeholder="Search accounts and videos" 
                        spellCheck={false}
                        onChange={handleChange} 
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx("clear")} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}


                    {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

                    <button className={cx("search-btn")} onMouseDown={handleSubmit}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
