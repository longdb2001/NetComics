import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserFriends, FaCaretDown, FaUserEdit } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { TbCategory } from 'react-icons/tb';
import { GiBookshelf } from 'react-icons/gi';
import './Sidebar.scss';
import logo from '~/assets/images/logo.png';
import logoIcon from '~/assets/images/logo-icon.png';
import routes from '~/config/routes';
import { ALL } from '~/util/constants';
import { useDispatch } from 'react-redux';
import { authSlide } from '~/store/authSlice';

function Sidebar({ isClose, isOpen }) {
    const menuSidebar = [
        {
            id: 1,
            title: 'Trang chủ',
            path: routes.admin,
            leftIcon: <MdSpaceDashboard />,
        },
        {
            id: 2,
            title: 'Người dùng',
            path: routes.userManager,
            leftIcon: <FaUserFriends />,
        },
        {
            id: 3,
            title: 'Thể loại',
            leftIcon: <TbCategory />,
            subMenu: [
                { title: 'Thêm mới', path: routes.genresManagerAdd },
                { title: 'Danh sách thể loại', path: routes.genresManager },
            ],
        },
        {
            id: 4,
            title: 'Tác giả',
            leftIcon: <FaUserEdit />,
            subMenu: [
                { title: 'Thêm mới', path: routes.authorManagerAdd },
                { title: 'Danh sách tác giả', path: routes.authorManager },
            ],
        },
        {
            id: 5,
            title: 'Truyện tranh',
            leftIcon: <GiBookshelf />,
            subMenu: [
                { title: 'Thêm truyện mới', path: routes.comicManagerAdd },
                { title: 'Thêm chapter mới', path: routes.chapterManagerAdd + ALL },
                { title: 'Danh sách truyện tranh', path: routes.comicManager },
            ],
        },
    ];

    const dispatch = useDispatch();

    const [isShowMenu, setIsShowMenu] = useState([]);

    const handleShowSubMenu = (index) => {
        if (isShowMenu.includes(index)) {
            setIsShowMenu((prev) => prev.filter((item) => item !== index));
        } else {
            setIsShowMenu([...isShowMenu, index]);
        }
    };

    return (
        <div
            className={
                'adm-sidebar d-flex flex-column justify-content-between' +
                (isClose ? ' close' : '') +
                (isOpen ? ' open' : '')
            }
        >
            <ul className="navbar-nav">
                <li className="nav-logo">
                    <Link className="nav-link d-flex align-items-center">
                        <span className="icon-link">
                            <img src={logoIcon} alt="NetComics" className="img-icon" />
                        </span>
                        <span className="link-name">
                            <img src={logo} alt="NetComics" />
                        </span>
                    </Link>
                </li>
                {menuSidebar.map((item) => (
                    <li key={item.id}>
                        {item.subMenu ? (
                            <>
                                <Link
                                    className="nav-link d-flex align-items-center"
                                    data-bs-toggle="collapse"
                                    to={isClose ? '' : '#collapse' + item.id}
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="collapse1"
                                    onClick={() => handleShowSubMenu(item.id)}
                                >
                                    <span className="icon-link">{item.leftIcon}</span>

                                    <span className="link-name">{item.title}</span>
                                    <FaCaretDown
                                        className={'ms-auto right-icon' + (isShowMenu.includes(item.id) ? ' show' : '')}
                                    />
                                </Link>
                                <div className="collapse" id={'collapse' + item.id}>
                                    <ul className="navbar-nav sub-nav ps-4">
                                        {item.subMenu.map((sub) => (
                                            <li key={sub.title}>
                                                <Link to={sub.path} className="nav-link">
                                                    <span>{sub.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="sub-menu">
                                    <span className="nav-link">{item.title}</span>
                                    <ul className="navbar-nav sub-nav ps-4">
                                        {item.subMenu.map((sub) => (
                                            <li key={sub.title}>
                                                <Link to={sub.path} className="nav-link">
                                                    <span>{sub.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={item.path} className="nav-link d-flex align-items-center">
                                    <span className="icon-link">{item.leftIcon}</span>
                                    <span className="link-name">{item.title}</span>
                                </Link>
                                <div className="sub-menu">
                                    <Link to={item.path} className="nav-link">
                                        {item.title}
                                    </Link>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <div className="logout">
                <Link
                    to={routes.adminLogin}
                    className="nav-link d-flex align-items-center"
                    onClick={() => dispatch(authSlide.actions.logOut())}
                >
                    <span className="icon-link">
                        <BiLogOut />
                    </span>
                    <span className="link-name">Đăng xuất</span>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
