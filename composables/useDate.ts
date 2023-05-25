export default function (date:string) {
    if(date == null) return '-';
    if(date == '-') return '-';
    if(date == '') return '-';
    let x = date.substring(0,10);
    return useState('useDate', () => x);
  }