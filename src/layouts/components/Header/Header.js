import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCoins, faEarthAmerica, faEllipsisVertical, faGear, faKeyboard, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from "react-router-dom"; 

import config from '@/config';
import Button from "@/components/Button";
import styles from "./Header.module.scss";
import images from '@/assets/images'
import Menu from "@/components/Popper/Menu";
import Image from "@/components/Image";
import { MessageBoxIcon, MessageIcon, UploadIcon } from "@/components/Icons";
import Search from "../Search";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAmerica}/>,
        title: 'English',
        children: {
            title: 'Language',
            data:[
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        title: 'Feedback and help',
        to: 'feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    
    const currentUser = true;
    
    // hanlde logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
        // switch (menuItem.type) {
        //     case 'language':
        //         // handle change languauge
        //         break;
        //     default:

        // }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'View profile',
            to: '@suka',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}/>,
            title: 'Get coins',
            to: 'coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear}/>,
            title: 'Setting',
            to: 'setting',
        },
        ...MENU_ITEMS, 
        {
            icon: <FontAwesomeIcon icon={faSignOut}/>,
            title: 'Log out',
            to: '/',
            separate: true,
        },
    ];

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>

                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="TikTok"/>
                </Link>

                {/* Search */}
                <Search/>

                <div className={cx('action')}>
                    {
                        currentUser ? (
                            <>
                                <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <UploadIcon/>
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MessageIcon/>
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 200]} content="Mail box" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MessageBoxIcon/>
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button text>Upload</Button>
                                <Button primary>Log in</Button>
                            </>
                        )
                    }

                    <Menu 
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {
                            currentUser ? (
                                <Image
                                    className={cx('user-avatar')} 
                                    src="https://yt3.ggpht.com/yti/ANjgQV8sN2ihSUlNvWhPQ5w-oy_GnvOeKOYBPXlkC7si6O9jcA=s88-c-k-c0x00ffffff-no-rj" 
                                    alt="User"
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                </button>
                            )
                        }
                    </Menu>
                </div>

            </div>
        </header>
    );
}

export default Header;
