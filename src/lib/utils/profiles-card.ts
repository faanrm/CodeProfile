export const getGitAge = (createdAt: string): number => {
    const creationDate = new Date(createdAt);
    const currentDate = new Date();
    return currentDate.getFullYear() - creationDate.getFullYear();
};

export const formatTopLanguages = (
    languages?: [string, { size: number; color: string }][]
) => {
    return languages?.slice(0, 5).map((lang, index) => ({
        key: index,
        name: lang[0],
        color: lang[1].color,
    }));
};