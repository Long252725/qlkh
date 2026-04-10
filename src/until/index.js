const handleData= (data)=> {
  if(data) {
    return data= data.toObject()
  } else {
    console.log('ko co data')
  }
}
const handleDatas = (datas)=> {
  return datas = datas.map(data=> data.toObject())
}
const handleDatasForMang = (datas)=> {
  return datas = datas.forEach()
}
const getInfoUser=(datas)=>{
    var a = datas
    return a
}
const setCookie = (cname, cvalue, exdays)=> {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

 
  
const getDate = (Dnow, Mnow, Ynow, pls) => {
  let MArray = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  function CheckNY(years){
      return (!(years%4) && (!(years%100) && years%400));
  }
      if(CheckNY(Ynow)) MArray[2] = 29;
  
      while (pls) {
          let tmp = MArray[Mnow] - Dnow;
          if (pls <= tmp) {Dnow += pls; break;}
          else {
              Dnow = 1;
              pls = pls - tmp - 1;
              
              ++Mnow;
              if (Mnow === 13) Mnow = 1, ++Ynow;
          }
          if (CheckNY(Ynow)) MArray[2] = 29;
          if (!CheckNY(Ynow)) MArray[2] = 28;
      }
      return `${Dnow} - ${Mnow} - ${Ynow}`
  }
  const getDay = (Dnow, Mnow, Ynow, pls) => {
    let MArray = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    function CheckNY(years){
        return (!(years%4) && (!(years%100) && years%400));
    }
        if(CheckNY(Ynow)) MArray[2] = 29;
    
        while (pls) {
            let tmp = MArray[Mnow] - Dnow;
            if (pls <= tmp) {Dnow += pls; break;}
            else {
                Dnow = 1;
                pls = pls - tmp - 1;
                
                ++Mnow;
                if (Mnow === 13) Mnow = 1, ++Ynow;
            }
            if (CheckNY(Ynow)) MArray[2] = 29;
            if (!CheckNY(Ynow)) MArray[2] = 28;
        }
        return Dnow
    }
  const getMonth = (Dnow, Mnow, Ynow, pls) => {
      let MArray = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      function CheckNY(years){
          return (!(years%4) && (!(years%100) && years%400));
      }
          if(CheckNY(Ynow)) MArray[2] = 29;
      
          while (pls) {
              let tmp = MArray[Mnow] - Dnow;
              if (pls <= tmp) {Dnow += pls; break;}
              else {
                  Dnow = 1;
                  pls = pls - tmp - 1;
                  
                  ++Mnow;
                  if (Mnow === 13) Mnow = 1, ++Ynow;
              }
              if (CheckNY(Ynow)) MArray[2] = 29;
              if (!CheckNY(Ynow)) MArray[2] = 28;
          }
          return Mnow
              }
const getYears = (Dnow, Mnow, Ynow, pls) => {
  let MArray = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  function CheckNY(years){
      return (!(years%4) && (!(years%100) && years%400));
  }
      if(CheckNY(Ynow)) MArray[2] = 29;
  
      while (pls) {
          let tmp = MArray[Mnow] - Dnow;
          if (pls <= tmp) {Dnow += pls; break;}
          else {
              Dnow = 1;
              pls = pls - tmp - 1;
              
              ++Mnow;
              if (Mnow === 13) Mnow = 1, ++Ynow;
          }
          if (CheckNY(Ynow)) MArray[2] = 29;
          if (!CheckNY(Ynow)) MArray[2] = 28;
      }
      return Ynow
  }

const numberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


module.exports = {handleData, handleDatas, getInfoUser, setCookie, getCookie, numberWithCommas, getDate, getDay, getMonth, getYears}