import { memo, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './StarRating.scss';
import { toastSuccess } from '~/util/toastify';
import { authSelector, comicSelector } from '~/store/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleComicBySlug } from '~/store/comicSlice';
import { apiAddRatingComic } from '~/services/rating';
import Stars from './Stars';

function StarRating() {
    const { slug } = useParams();
    const dispatch = useDispatch();

    const { currentUser } = useSelector(authSelector);
    const { comic } = useSelector(comicSelector);

    const [rating, setRating] = useState(-1);
    const [hover, setHover] = useState(-1);
    const [currentRating, setCurrentRating] = useState(0);
    const [currentRatingTime, setCurrentRatingTime] = useState();
    const [currentContent, setCurrentContent] = useState('');
    const [isRated, setIsRated] = useState(false);

    const [ratingText, setRatingText] = useState('');

    useEffect(() => {
        if (currentUser && comic?.Ratings) {
            const find = comic.Ratings.find((item) => item.userId === currentUser?.id);
            if (find) {
                setCurrentRating(find?.rating);
                setCurrentContent(find?.content);
                setCurrentRatingTime(find?.createdAt);
            }
        }
    }, [comic?.Ratings, currentUser]);

    useEffect(() => {
        if (currentRating > 0) {
            setRating(currentRating);
            setHover(currentRating);
            setIsRated(true);
        }
    }, [currentRating]);

    const handleRating = async (rating, userId, comicId) => {
        if (rating && userId && comicId) {
            if (currentRating <= 0) {
                const response = await apiAddRatingComic(rating, userId, comicId);
                if (response?.data.err === 0) {
                    toastSuccess('Đánh giá thành công', 'bottom-right');
                    dispatch(getSingleComicBySlug(slug));
                }
            }
        }
    };

    const handleChange = (e) => {
        setRatingText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRating({ rating: rating, content: ratingText }, currentUser?.id, comic?.id);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stars
                    setRating={setRating}
                    setHover={setHover}
                    rating={rating}
                    hover={hover}
                    isRated={isRated}
                    currentRatingTime={currentRatingTime}
                />
                {isRated ? (
                    <>
                        <p className="current-rating">{currentContent || ''}</p>
                    </>
                ) : (
                    <>
                        <textarea
                            className="rating-input"
                            placeholder="Mô tả suy nghĩ của bạn (Không bắt buộc)"
                            value={ratingText}
                            onChange={handleChange}
                        ></textarea>
                        <button className="btn btn-success">Đánh giá</button>
                    </>
                )}
            </form>

            <ToastContainer />
        </>
    );
}

export default memo(StarRating);
