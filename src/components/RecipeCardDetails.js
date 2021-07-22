import React from 'react'
import { View, Text, Image} from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'

const RecipeCardDetails = ({recipeItem}) => {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
           {/** Name and Boolmark */}
           <View style={{
               flex: 1,
               flexDirection: 'row',
               justifyContent: 'space-between'
           }}>
               <Text style={{
                   width: '70%',
                   color: COLORS.white,
                   ...FONTS.h3,
                   fontSize: 18
               }}>
                   {recipeItem.name}
               </Text>
               
               <Image
                    source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark }
                    style={{
                        width: 20,
                        height: 20,
                        marginRight: SIZES.base,
                        tintColor: COLORS.darkGreen
                    }}
               />
                </View>
               {/** duration */}
               <Text style={{
                    color: COLORS.lightGray,
                    ...FONTS.body4
               }}>
                    {recipeItem.duration} | {recipeItem.serving} Serving
               </Text>
          
        </View>
    )
}

export default RecipeCardDetails
