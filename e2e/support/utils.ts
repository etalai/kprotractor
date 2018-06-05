
export class Utils {

  getTodaysDate(): string {
    const today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    return `${dd}-${mm}-${yyyy}`;
  }

}
