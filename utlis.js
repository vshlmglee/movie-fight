function debounce(func,delay= 1000){
    let timeout ;
    return (...args)=>{
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        func.apply(null,args);
      },delay);
    }
  }