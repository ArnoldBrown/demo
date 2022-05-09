// import React ,{useState} from 'react'
// import {View ,Text ,ScrollView} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';

// export default function Mock({items ,initial}) {

    

//     const [displayChildren, setDisplayChildren] = useState({});



//     const [idss, setidds] = useState('');


// console.log(idss)


//   return (
    
// <View>
// <ScrollView  contentContainerStyle={{flexGrow:1}}>
// {items.map((e)=>{

//     return (


// <View  >


// <View >


// <TouchableOpacity  style={{flexDirection:"row" ,marginBottom:11 ,backgroundColor:"red" ,padding:11, flexDirection:"row" ,marginBottom:11 ,backgroundColor:"yellow" ,padding:11}}      
//                 onPress={() => [

//                   setDisplayChildren({
//                     displayChildren,
//                     [e.categories_name]: !displayChildren[e.categories_name],
//                   }),

//                   setidds(e.categories_id)

//                 ]
//                 }
           
//               >   


// <Text>{e.categories_name}</Text>   






//             {e.childs && (
         
//              displayChildren[e.categories_name]?<Text>-</Text> : <Text>+</Text>


             
//             )}

// </TouchableOpacity>
// </View>






//  {displayChildren[e.categories_name] && e.childs  && <Mock items={e.childs} />}




// </View>

//     )
// })}




// </ScrollView>





// </View>




//   )
// }



import React,{useState ,useEffect ,useRef} from 'react'
import {View ,Text ,FlatList, Image ,StyleSheet ,Animated} from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'




export default function Mock() {

const _scrollY= useRef(new Animated.Value(0)).current;




  const [data,setData]=useState([
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    },
    {
      "userId": 1,
      "id": 4,
      "title": "et porro tempora",
      "completed": true
    },
    {
      "userId": 1,
      "id": 5,
      "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
      "completed": false
    },
    {
      "userId": 1,
      "id": 6,
      "title": "qui ullam ratione quibusdam voluptatem quia omnis",
      "completed": false
    },
    {
      "userId": 1,
      "id": 7,
      "title": "illo expedita consequatur quia in",
      "completed": false
    },
    {
      "userId": 1,
      "id": 8,
      "title": "quo adipisci enim quam ut ab",
      "completed": true
    },
    {
      "userId": 1,
      "id": 9,
      "title": "molestiae perspiciatis ipsa",
      "completed": false
    },
    {
      "userId": 1,
      "id": 10,
      "title": "illo est ratione doloremque quia maiores aut",
      "completed": true
    },
    {
      "userId": 1,
      "id": 11,
      "title": "vero rerum temporibus dolor",
      "completed": true
    },
    {
      "userId": 1,
      "id": 12,
      "title": "ipsa repellendus fugit nisi",
      "completed": true
    },
    {
      "userId": 1,
      "id": 13,
      "title": "et doloremque nulla",
      "completed": false
    },
    {
      "userId": 1,
      "id": 14,
      "title": "repellendus sunt dolores architecto voluptatum",
      "completed": true
    },
    {
      "userId": 1,
      "id": 15,
      "title": "ab voluptatum amet voluptas",
      "completed": true
    },
    {
      "userId": 1,
      "id": 16,
      "title": "accusamus eos facilis sint et aut voluptatem",
      "completed": true
    },
    {
      "userId": 1,
      "id": 17,
      "title": "quo laboriosam deleniti aut qui",
      "completed": true
    },
    {
      "userId": 1,
      "id": 18,
      "title": "dolorum est consequatur ea mollitia in culpa",
      "completed": false
    },
    {
      "userId": 1,
      "id": 19,
      "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
      "completed": true
    },
    {
      "userId": 1,
      "id": 20,
      "title": "ullam nobis libero sapiente ad optio sint",
      "completed": true
    },
    {
      "userId": 2,
      "id": 21,
      "title": "suscipit repellat esse quibusdam voluptatem incidunt",
      "completed": false
    },
    {
      "userId": 2,
      "id": 22,
      "title": "distinctio vitae autem nihil ut molestias quo",
      "completed": true
    },
    {
      "userId": 2,
      "id": 23,
      "title": "et itaque necessitatibus maxime molestiae qui quas velit",
      "completed": false
    },
    
  ])



// useEffect(() => {
  
//    fetch("http://localhost:3000/api/v1/static", 
//    {
//     method: 'GET',
//     headers: new Headers({
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     }),
  
//   })
//   .then((response) => response.json())
//       .then((e)=>{

//         console.log(e)


//       }).catch((e)=>console.log("WDwdwd",e))



//   return () => {
    
//   }
// }, [])






  return (
   
    <View style={{paddingTop:11}}>

   


</View>


  )
}
