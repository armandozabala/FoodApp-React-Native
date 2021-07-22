import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Platform, View, Image, Text, TouchableOpacity } from 'react-native'
import { COLORS, SIZES, FONTS, icons } from '../../constants'


const RecipeCreatorDetail = ({selectedRecipe}) => {
    return(
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }}>

            {/**photo */}
            <View style={{
                width: 40,
                height: 40,
                marginLeft: 20
            }}>
                <Image
                    source={selectedRecipe?.author?.profilePic}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    }}
                />
            </View>
            {/**labels */}
            <View style={{
                flex: 1,
                marginHorizontal: 20
            }}>
                <Text style={{color: COLORS.lightGray2, ...FONTS.body4}}>
                    Recipe by:
                </Text>
                <Text style={{color: COLORS.white2, ...FONTS.h3}}>
                    {selectedRecipe?.author?.name}
                </Text>
                
            </View>
            {/**button */}
            <TouchableOpacity style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: COLORS.lightGreen1
            }}>
                <Image
                    source={icons.rightArrow}
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.lightGreen1
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}


const RecipeCreatorCardInfo = ({selectedRecipe}) => {
   if(Platform.OS === 'ios'){
       return(
            <BlurView style={{
                flex: 1,
                borderRadius: SIZES.radius
            }}
            blurType="dark"
            >
                <RecipeCreatorDetail
                    selectedRecipe={selectedRecipe}
                />
            </BlurView>
       )
   }else{
       return(
            <View style={{
                flex: 1,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.transparentBlack9
            }}>
                    <RecipeCreatorDetail
                       selectedRecipe={selectedRecipe}
                     />
            </View>
       )
   }
}

export default RecipeCreatorCardInfo
