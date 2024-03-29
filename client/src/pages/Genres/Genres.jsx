// import { MdDateRange, MdOutlineFiberNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
// import { AiOutlineEye } from 'react-icons/ai';
// import { BiListUl } from 'react-icons/bi';
// import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import Breadcrumb from '~/components/Breadcrumb';
import { Sidebar } from '~/layouts/components';
// import FilterButton from '~/components/Button/FilterButton';
import routes from '~/config/routes';
import './Genres.scss';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import { comicSelector, genreSelector } from '~/store/selector';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ALL } from '~/util/constants';
import { getSingleGenreBySlug } from '~/store/genreSlice';
import noComics from '~/assets/images/no-comics.jpg';

function Genres() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { comics, getComicsLimitStatus, getComicsByGenreStatus } = useSelector(comicSelector);
    const { genres, genre, getSingleGenreBySlugStatus } = useSelector(genreSelector);

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres + ALL },
        {
            title: slug === ALL ? 'Tất cả' : genre?.name,
            to: routes.genres + slug,
        },
    ];

    // const filterButtons = [
    //     { text: 'Tất cả', active: !params.get('status') || params.get('status') === -1 },
    //     { text: 'Hoàn thành', active: params.get('status') === 2 },
    //     { text: 'Đang tiến hành', active: params.get('status') === 1 },
    // ];

    // const sortButtons = [
    //     { text: 'Ngày cập nhật', leftIcon: <MdDateRange />, active: !params.get('sort') },
    //     { text: 'Truyện mới', leftIcon: <MdOutlineFiberNew />, active: params.get('sort') === 1 },
    //     { text: 'Top all', leftIcon: <AiOutlineEye />, active: params.get('sort') === 2 },
    //     { text: 'Top tháng', leftIcon: <AiOutlineEye />, active: params.get('sort') === 3 },
    //     { text: 'Top tuần', leftIcon: <AiOutlineEye />, active: params.get('sort') === 4 },
    //     { text: 'Top ngày', leftIcon: <AiOutlineEye />, active: params.get('sort') === 5 },
    //     { text: 'Theo dõi', leftIcon: <FaHeart />, active: params.get('sort') === 6 },
    //     { text: 'Bình luận', leftIcon: <FaCommentAlt />, active: params.get('sort') === 7 },
    //     { text: 'Số chapter', leftIcon: <BiListUl />, active: params.get('sort') === 8 },
    // ];

    const [genreInfo, setGenreInfo] = useState({
        name: 'Tất cả truyện tranh',
        description: 'Tất cả thể loại truyện tranh',
    });

    useEffect(() => {
        if (getSingleGenreBySlugStatus === 'success') {
            if (slug === ALL) {
                document.title = 'Thể loại | NetComics';
            } else {
                if (genre) {
                    document.title = `Thể loại ${genre.name} | NetComics`;
                }
            }
        } else {
            document.title = 'Thể loại | NetComics';
        }
    }, [genre, getSingleGenreBySlugStatus, slug]);

    useEffect(() => {
        if (slug === ALL) {
            setGenreInfo({ name: 'Tất cả truyện tranh', description: 'Tất cả thể loại truyện tranh' });
        } else {
            dispatch(getSingleGenreBySlug(slug));
        }
    }, [comics, dispatch, slug]);

    useEffect(() => {
        if (genre) {
            setGenreInfo(genre);
        }
    }, [genre]);

    const handleChangeSelect = (e) => {
        navigate(`${routes.genres}${e.target.value}`);
    };

    return (
        <>
            {getComicsLimitStatus !== 'pending' && getComicsByGenreStatus !== 'pending' && (
                <Breadcrumb list={breadcrumb} />
            )}
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <h1 className="text-center genre-name">
                            {getSingleGenreBySlugStatus === 'pending' ? '' : genreInfo.name}
                        </h1>
                        <select className="genre-list" onChange={handleChangeSelect}>
                            <option value={ALL}>Tất cả thể loại</option>
                            {genres?.map((gen) => (
                                <option key={gen.id} value={gen.slug}>
                                    {gen.name}
                                </option>
                            ))}
                        </select>
                        <div className="genre-description">
                            <div className="info">
                                {getSingleGenreBySlugStatus === 'pending' ? '' : genreInfo.description}
                            </div>
                        </div>
                        {/* <div className="filter-wrapper">
                            <div className="filter row">
                                <div className="col-3"></div>
                                <div className="col-9 d-flex align-items-center">
                                    {filterButtons.map((filterButton, index) => (
                                        <FilterButton key={index} active={filterButton.active} primary>
                                            {filterButton.text}
                                        </FilterButton>
                                    ))}
                                </div>
                            </div>
                            <div className="sort row">
                                <div className="col-3">
                                    <p className="filter-title">Sắp xếp theo:</p>
                                </div>
                                <div className="col-9 d-flex flex-wrap align-items-center">
                                    {sortButtons.map((sortButton, index) => (
                                        <FilterButton
                                            key={index}
                                            secondary
                                            active={sortButton.active}
                                            leftIcon={sortButton.leftIcon}
                                        >
                                            {sortButton.text}
                                        </FilterButton>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                        <ListComicItem
                            genres
                            skeleton={getComicsLimitStatus === 'pending' || getComicsByGenreStatus === 'pending'}
                            list={comics}
                        />
                        {getComicsLimitStatus !== 'pending' &&
                            getComicsByGenreStatus !== 'pending' &&
                            comics?.length <= 0 && (
                                <div className="no-comics">
                                    <img src={noComics} alt="no-comics" />
                                    <p>Oops! Chưa có truyện nào thuộc thể loại {genre?.name}</p>
                                </div>
                            )}
                    </div>
                </div>
                <Sidebar genres />
            </div>
        </>
    );
}

export default Genres;
