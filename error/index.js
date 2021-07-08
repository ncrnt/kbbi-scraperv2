module.exports = (res, rej, query) => {
    const err = {
        message: `Kata "${query}" tidak ditemukan...`,
        error: true,
        data: {}
    }

    res(err);
}