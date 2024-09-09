import { useState, useEffect, useRef } from "react";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper } from "@/components/Popper";
import AccountItem from "@/components/AccountItem";
import { SearchIcon } from "@/components/Icons";
import { useDebounce } from "@/hooks";
import * as searchService from '@/apiServices/searchService';

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

    return (
        <HeadlessTippy
            interactive
            visible={searchResult.length > 0 && showResult}
            render={(attrs) => (
                <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx("search-title")}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result}/>
                        ))}
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
                    onChange={(e) => setSearchValue(e.target.value)} 
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && !loading && (
                    <button className={cx("clear")} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}


                {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

                <button className={cx("search-btn")}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
