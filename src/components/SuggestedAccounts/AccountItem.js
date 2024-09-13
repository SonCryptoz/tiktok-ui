import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';

import Image from '../Image';
import { Wrapper as PopperWrapper } from '../Popper';
import styles from './SuggestedAccounts.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function AccountItem({ data }) {

    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <div className={cx('wrapper-popper')}>
                        <div className={cx('header-popper')}>
                            <Image 
                                className={cx('avatar-popper')} 
                                // src={data.avatar} 
                                src="https://yt3.ggpht.com/yti/ANjgQV8sN2ihSUlNvWhPQ5w-oy_GnvOeKOYBPXlkC7si6O9jcA=s88-c-k-c0x00ffffff-no-rj" 
                                alt={data.full_name}
                            />
                            <Button className={cx('follow-btn-popper')} primary>Follow</Button>
                        </div>
                        <div className={cx('body-popper')}>
                            <p className={cx('nickname-popper')}>
                                <strong>
                                    {/* {data.nickname} */}
                                    SonSuka
                                </strong>
                                {data.tick = true && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>}
                            </p>
                            <p className={cx('name-popper')}>
                                <span>
                                    {/* {data.full_name} */}
                                    Nguyen Son
                                </span>
                            </p>
                            <p className={cx('analytics-popper')}>
                                <strong className={cx('value-popper')}>8.2M </strong>
                                <span className={cx('label-popper')}>Followers</span>
                                <strong className={cx('value-popper')}>518.2M </strong>
                                <span className={cx('label-popper')}>Likes</span>
                            </p>
                        </div>
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    return ( 
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-20, 0]}
                render={renderPreview}
                placement='bottom'

            >
                <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                    <Image 
                        className={cx('avatar')} 
                        // src={data.avatar} 
                        src="https://yt3.ggpht.com/yti/ANjgQV8sN2ihSUlNvWhPQ5w-oy_GnvOeKOYBPXlkC7si6O9jcA=s88-c-k-c0x00ffffff-no-rj" 
                        alt={data.full_name}
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>
                                {/* {data.nickname} */}
                                SonSuka
                            </strong>
                            {data.tick = true && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>}
                        </p>
                        <p className={cx('name')}>
                            <span>
                                {/* {data.full_name} */}
                                Nguyen Son
                            </span>
                        </p>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;