export {interlaceArray}

function interlaceArray(arr) {
    return arr.reduce((result, _, i) => {
        const left = i;
        const right = arr.length - 1 - i;
        if (left <= right) {
            result.push(arr[left]);
            if (left !== right) result.push(arr[right]);
        }
        return result;
    }, []);
}