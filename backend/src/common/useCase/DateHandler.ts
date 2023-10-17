

export class DateHandler {
    private readonly currentDate = new Date();
    private readonly currentYear = this.currentDate.getFullYear();
    private readonly currentMonth = this.currentDate.getMonth();

    firstDay = (): Date => {
        return new Date(this.currentYear, this.currentMonth, 1);
    }

    lastDay = (): Date => {
        return new Date(this.currentYear, this.currentMonth + 1, 0, 23, 59, 59, 999);
    }
}


