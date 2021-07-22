import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { COLORS, SIZES } from '../../constants'
import RecipeCardDetails from './RecipeCardDetails'

const RecipeCardInfo = ({recipeItem}) => {

    if(Platform.OS === 'ios'){

        return (
            <BlurView
                blurType="dark"
                style={styles.recipeCardContainer}
            >
                <RecipeCardDetails
                   recipeItem={recipeItem}
                />
            </BlurView>
        )

    }else{
        return(
            <View style={{
                ...styles.recipeCardContainer,
                backgroundColor: COLORS.transparentDarkGray
            }}>
                <RecipeCardDetails
                   recipeItem={recipeItem}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    recipeCardContainer : {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 100,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius
    }
})

export default RecipeCardInfo
