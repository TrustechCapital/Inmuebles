

export function humanFileSize(size: number) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const humanReadableSize = size / Math.pow(1024, i);
    return (
        humanReadableSize.toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
}

//const numberFormatter = new Intl.NumberFormat('es-MX', {minimumFractionDigits: 2});

export function inscitechFormatMoney(value: string) {
    var strY = value;
    var deci = '.00';
    if(value === null || value === 'null') {
        return value;
    }
    if(strY.indexOf('.') != -1) {
      deci = strY.substring(strY.indexOf('.'));
      if(deci.length < 3) deci += '0';
      strY = strY.substring(0,strY.indexOf('.'));
    }
    var theMoney = '';
    while(strY != '') { 
      var x = strY.substring(strY.length-3, strY.length); 
      strY = strY.substring(0, strY.length-3); 
      theMoney = ','+x+theMoney;
    };
    console.log('theMoney: ' + theMoney.substring(1)+deci); 
    return theMoney.substring(1)+deci;
}

export function formatMoney(value: any | null): string {
    //return !value ? '0' : numberFormatter.format(value);
    console.log('valor formatMoney: ' + value);
    return value===null || value==='' || value===Number('0')? '0' : inscitechFormatMoney(''+value);
}
