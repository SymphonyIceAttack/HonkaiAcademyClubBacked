export const RemoveApproximation = (
    dateList: number[],
    isNext = true
): number[] => {
    if (!isNext) {
        return dateList;
    }
    for (let i = 0; i <= dateList.length - 2; i++) {
        if (dateList[i + 1] - dateList[i] < 20 * 24 * 3600) {
            if (i + 1 == dateList.length - 1) {
                return RemoveApproximation(
                    dateList.slice(0, dateList.length - 1),
                    false
                );
            }
            return RemoveApproximation([
                ...dateList.slice(0, i + 1),
                ...dateList.slice(i + 2),
            ]);
        }
    }
    return RemoveApproximation(dateList, false);
};
