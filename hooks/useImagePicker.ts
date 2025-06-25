import { MediaType, usePermissions } from "expo-media-library";
import * as ImagePicker from "expo-image-picker"
import { useState } from "react";

export function useImagePicker(){
    const [image, setImage] = useState<string | undefined>(undefined)
    const [status, requestPermission] = usePermissions()

    async function openImage(){
        if (status === null){
            const permission = await requestPermission()
            if(permission.granted === false){
                alert ("Gimmie Permission NOW!!")
                return
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled){
            setImage(result.assets[0].uri)
        }
    }

    function reset(){
        setImage(undefined)
    }
    
    return {image, openImage, reset}
}