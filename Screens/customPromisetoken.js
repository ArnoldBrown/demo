export default function onPromisetoken(setretriewModel ,dispatch ,CartviewAction  ,dbToken ,sessionResponse ,groceryName) {
    return new Promise(resolve => {
      setTimeout(() => {
          
        resolve(
          setretriewModel(false),
          dispatch(
            CartviewAction(
              dbToken !== '' ? dbToken : sessionResponse,
              groceryName,
            ),
          ),
        );
      }, 200);
    });
  }