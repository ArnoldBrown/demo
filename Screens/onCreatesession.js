

export default   function onCreatesession( dispatch ,sessionAction ,session ,AsyncStorage ,setDbToken ,onChangenote ) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
         
          dispatch(sessionAction(session +  (Math.random() * 999) 
          ) )   ,
         
          AsyncStorage.removeItem('retrievToken'),

          setDbToken(''),
          onChangenote(''),


        );
      }, 500);
    });
  }