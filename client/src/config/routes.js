const routes = {
    home: '/',
    homePage: '/trang-chu',
    logIn: '/dang-nhap',
    verifyEmail: '/verify-email',
    signUp: '/dang-ky',
    follow: '/theo-doi',
    history: '/lich-su',
    genres: '/the-loai/',
    genresBySlug: '/the-loai/:slug',
    comic: '/truyen-tranh/',
    comicBySlug: '/truyen-tranh/:slug',
    chapter: '/truyen-tranh/:slug/:chapterSlug',
    rating: '/xep-loai',
    searchComic: '/tim-truyen-nang-cao',
    searchResult: '/tim-truyen',
    profile: '/profile',
    profileEdit: '/profile/cap-nhat',
    profileChangePassword: '/profile/doi-mat-khau',

    //admin
    admin: '/quan-tri',
    adminLogin: '/quan-tri/dang-nhap',

    userManager: '/quan-tri/nguoi-dung',

    genresManager: '/quan-tri/the-loai',
    genresManagerAdd: '/quan-tri/the-loai/them-moi',
    genresManagerEdit: '/quan-tri/the-loai/sua/',
    genresManagerEditById: '/quan-tri/the-loai/sua/:id',

    authorManager: '/quan-tri/tac-gia',
    authorManagerAdd: '/quan-tri/tac-gia/them-moi',
    authorManagerEdit: '/quan-tri/tac-gia/sua/',
    authorManagerEditById: '/quan-tri/tac-gia/sua/:id',

    comicManager: '/quan-tri/truyen-tranh',
    comicManagerAdd: '/quan-tri/truyen-tranh/them-moi',
    comicManagerEdit: '/quan-tri/truyen-tranh/sua/',
    comicManagerEditById: '/quan-tri/truyen-tranh/sua/:id',
    comicManagerDetail: '/quan-tri/truyen-tranh/chi-tiet/',
    comicManagerDetailById: '/quan-tri/truyen-tranh/chi-tiet/:id',

    chapterManagerAdd: '/quan-tri/truyen-tranh/them-chap/',
    chapterManagerAddById: '/quan-tri/truyen-tranh/them-chap/:comicId',
    chapterManagerEdit: '/quan-tri/truyen-tranh/sua-chap/',
    chapterManagerEditById: '/quan-tri/truyen-tranh/sua-chap/:comicId/:chapterId',
};

export default routes;
