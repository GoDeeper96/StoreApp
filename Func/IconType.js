import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
const IconType = (type) => {
//   let component;
  switch (type) {
    case 'application/vnd.ms-powerpoint':
        return <MaterialCommunityIcons name="file-powerpoint-box" size={24} color="black" />
    case 'application/x-7z-compressed':
        return <FontAwesome name="file-zip-o" size={24} color="black" />
    case 'image/jpeg':
        return <MaterialCommunityIcons name="file-jpg-box" size={24} color="black" />
    default:
        return  <Feather name="file" size={24} color="black" />;
  }

}
export default IconType;

{/* <FontAwesome name="file-zip-o" size={24} color="black" />
    <MaterialCommunityIcons name="file-excel" size={24} color="black" />
    
    <AntDesign name="wordfile1" size={24} color="black" />
    
    <FontAwesome5 name="file-pdf" size={24} color="black" /> */}