export function getCurrentDate(): any {
    //  👉️ 7/31/2023
    const now = new Date();
    return now.toLocaleDateString();
  }
  
  export function getLocaleDateTime(): any {
    // 👉️ 7/31/2023, 11:40:47 AM
    const now = new Date();
    return now.toLocaleString();
  }
  
  export function getUTCDateTime(): any {
    // Mon, 31 Jul 2023 08:40:47 GMT
    const now = new Date();
    return now.toUTCString();
  }

  export function convertToUTCDateTime(date: string): any {
    // Mon, 31 Jul 2023 08:40:47 GMT
    const now = new Date(date);
    return now.toUTCString();
  }
  
  export function getISODateTime(): any {
    // 👉️ 2023-07-31T08:40:47.891Z
    const now = new Date();
    return now.toISOString();
  }

  export function dateSingleDigitWithLeadingZeros(dateNum:number) {
    if(dateNum < 10)
     return String(dateNum).padStart(2, '0');
    return dateNum
  }

  /* References: 
  * https://stackoverflow.com/questions/11526504/minimum-and-maximum-date
  */