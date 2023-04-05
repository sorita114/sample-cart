const currency = (data:number|string, langCode = 'ko-KR'):string => {
  try{
    let returnValue:number|string = data;

    if(typeof data === 'string'){
      returnValue = Number(data);
    }

    return `${returnValue.toLocaleString(langCode)}${langCode === 'ko-KR' ? '원' : ''}`;
  }catch{
    return '';
  }
};

export default currency;