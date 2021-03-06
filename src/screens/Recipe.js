
import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import RecipeCreatorCardInfo from '../components/RecipeCreatorCardInfo';
import Viewers from '../components/Viewers';

const HEADER_HEIGHT = 350;

const Recipe = ({ navigation, route }) => {

    const [selectedRecipe, setSelectedRecipe] = useState(null)

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        let {recipe} = route.params;
        setSelectedRecipe(recipe);

    },[])

    const renderReciperHeader = () => {
        return(
            <View style={{
                alignItems: 'center'
            }}>

                {/* Background Image  */}
                <Animated.Image
                     source={selectedRecipe?.image}
                     resizeMode='contain'
                     style={{
                         height: HEADER_HEIGHT,
                         width: '200%',
                         transform: [
                             {
                                 translateY: scrollY.interpolate({
                                     inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                     outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.25]
                                 })
                             },
                             {
                                 scale: scrollY.interpolate({
                                     inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                     outputRange: [2,1,0.85]
                                 })
                             }
                         ]
                     }}
                />
                {/**Recipe Creator Card */}
                <Animated.View style={{
                     position: 'absolute',
                     bottom: 10,
                     left: 30,
                     right: 30,
                     height: 80,
                     transform: [
                         {
                             translateY: scrollY.interpolate({
                                 inputRange: [0,140,450],
                                 outputRange: [0,0,100],
                                 extrapolate: 'clamp'
                             })
                         }
                     ]
                }}>
                    <RecipeCreatorCardInfo
                        selectedRecipe={selectedRecipe}
                    />
                </Animated.View>


            </View>
        )
    }

    const renderHeaderBar = () => {
        return(
            <View style={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,
                 height: 90,
                 flexDirection: 'row',
                 alignItems: 'flex-end',
                 justifyContent: 'space-between',
                 paddingHorizontal: SIZES.padding,
                 paddingBottom: 10
            }}>

                {/**Screen overlay */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 10,
                        backgroundColor: COLORS.black,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT-100, HEADER_HEIGHT-50],
                            outputRange: [0,1]
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT-100, HEADER_HEIGHT-50],
                                    outputRange: [50,0],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <Text style={{
                         color: COLORS.lightGray2,
                         ...FONTS.body4
                    }}>Recipe by:</Text>
                    <Text style={{
                        color: COLORS.white2,
                        ...FONTS.h3
                    }}>{selectedRecipe?.author?.name}
                    </Text>
                </Animated.View>

                {/**back button */}
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    width: 35,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray,
                    backgroundColor: COLORS.transparentBlack5    
                }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.lightGray
                        }}
                    />

                </TouchableOpacity>

                {/**Bookmark */}
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    width: 35
                }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={ selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.darkGreen
                        }}
                    />

                </TouchableOpacity>
            </View>
        )
    }

    const renderRecipeInfo = () => {
        return(
            <View style={{
                flexDirection: 'row',
                height: 180,
                marginTop: 10,
                width: SIZES.width,
                paddingHorizontal: 30,
                paddingVertical: 20,
                alignItems: 'center'
            }}>

              {/**Recipe */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{...FONTS.h2}}>{selectedRecipe?.name}</Text>
                    <Text>
                         { selectedRecipe?.duration} | {selectedRecipe?.serving} Serving
                    </Text>
                </View>

                {/**Viewers */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Viewers
                        viewerList={selectedRecipe?.viewers}
                    />
                </View>

            </View>
        )
    }

    const renderIngredientHeader = () => {
        return(
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                marginTop: SIZES.radius,
                marginBottom: SIZES.padding
            }}>
                <Text style={{
                    flex: 1,
                    ...FONTS.h3
                }}>
                    Ingredients
                </Text>

                <Text style={{
                    color: COLORS.lightGray2,
                    ...FONTS.body4
                }}>
                    {selectedRecipe?.ingredients.length} items 
                </Text>

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
        <Animated.FlatList
            data={selectedRecipe?.ingredients}
            keyExtractor={ item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                 <View>
                     {/**HEader */}
                     {renderReciperHeader()}
                     {/**Info */}
                     { renderRecipeInfo() }
                     {/**Ingrdiente */}
                     { renderIngredientHeader()}
                 </View>
            }
            scrollEventThrottle={10}
            onScroll={ Animated.event([
                 { nativeEvent: { contentOffset: { y: scrollY }} }
            ], { useNativeDriver: true })}
            renderItem={({item}) => (
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 30,
                    marginVertical: 5
                }}>
                    {/**Icon */}
                    <View style={{
                         alignItems: 'center',
                         justifyContent: 'center',
                         height: 50,
                         width: 50,
                         borderRadius: 5,
                         backgroundColor: COLORS.lightGray
                    }}>
                        <Image
                            source={item.icon}
                            style={{
                                height: 40,
                                width: 40
                            }}
                        />

                    </View>

                    {/** Description */}

                    <View style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            ...FONTS.body3
                        }}>
                             {item.description}
                        </Text>
                    </View>

                    {/** Quantity */}
                    <View style={{
                         alignItems: 'flex-end',
                         justifyContent: 'center'
                    }}>
                        <Text style={{...FONTS.body3}}>{item.quantity}</Text>
                    </View>
                </View>
            )}
            ListFooterComponent={
                <View
                    style={{marginBottom: 200}}
                />
            }
        />

        {/**headr bar */}
        { renderHeaderBar() }
        </View>
    )
}

export default Recipe;