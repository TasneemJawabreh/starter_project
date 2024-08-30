function checkForUrl(url) {
    const regex = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,6}(:\d{1,5})?(\/.*)?$/i;
    return regex.test(url);
}

export { checkForUrl };
