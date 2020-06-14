export function humanFileSize(size: number) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const humanReadableSize = size / Math.pow(1024, i);
    return (
        humanReadableSize.toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
}
