import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONTS, images, SIZES, icons, dummyData } from '../../constants';
import CategoryCard from '../components/CategoryCard';
import TrendingCard from '../components/TrendingCard';


const Home = ({ navigation }) => {

    const renderHeader = () => {
        return(
            <View style={{
                flexDirection: 'row',
                marginHorizontal: SIZES.padding,
                alignItems: 'center',
                height: 80
            }}>
            
            <View style={{
                 flex: 1
            }}>
                <Text style={{
                    color: COLORS.darkGreen,
                    ...FONTS.h2
                }}> 
                    Hello Armando Zabala
                </Text>

                <Text style={{
                    marginTop: 3,
                    color: COLORS.gray,
                    ...FONTS.body3
                }}>
                    What you want to cook today?
                </Text>
            </View>

            <TouchableOpacity
                onPress={()=> console.log('Profile')}
            >
                <Image
                    source={images.profile}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    }}
                />

            </TouchableOpacity>

            </View>
        )
    }

    const renderSearchBar = () => {
        return(
            <View style={{
                 flexDirection: 'row',
                 height: 50,
                 alignItems: 'center',
                 marginHorizontal: SIZES.padding,
                 paddingHorizontal: SIZES.radius,
                 borderRadius: 10,
                 backgroundColor: COLORS.lightGray
            }}>
                <Image
                    source={icons.search}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}
                />
                <TextInput
                    style={{
                        marginLeft: 12,
                        ...FONTS.body3
                    }}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Search"
                />
            </View>
        )
    }

    const renderSeeRecipeCard = () => {
        return(
            <View style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                borderRadius: 10,
                backgroundColor: COLORS.lightGreen
            }}>
                {/** Image */}
                <View style={{
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={images.recipe}
                        style={{
                             width: 80,
                             height: 80
                        }}
                    />
                </View>
                {/* Text */}
                <View style={{
                    flex: 1,
                    paddingVertical: SIZES.radius
                }}>
                    <Text style={{
                         width: '70%',
                         ...FONTS.body4
                    }}>
                         You have 12 recipes favorites
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginTop: 10
                        }}
                        onPress={()=> console.log('See Recipes')}
                    >
                        <Text style={{
                             color: COLORS.darkGreen,
                             textDecorationLine: 'underline',
                             ...FONTS.h4
                        }}>
                            See Recipes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderTrendingSection = () => {
        return(
            <View style={{
                 marginTop: SIZES.padding
            }}>
                <Text style={{
                     marginHorizontal: SIZES.padding,
                     ...FONTS.h2
                }}>
                    Trending Recipe
                </Text>

                <FlatList
                     data={dummyData.trendingRecipes}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     keyExtractor={ item => `${item.id}`}
                     renderItem={({item, index}) => {
                         return(
                             <TrendingCard
                                 containerStyle={{
                                        marginLeft: index == 0 ? SIZES.padding : 0
                                 }}
                                 recipeItem={item}
                                 onPress={() => navigation.navigate('Recipe', { recipe: item })}
                             />
                         )
                     }}
                />

            </View>
        )
    }

    const renderCategoryHeader = () => {
        return(
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginHorizontal: SIZES.padding
            }}>
                {/**Section Title */}
                <Text style={{
                     flex: 1,
                     ...FONTS.h2
                }}>
                     Categories
                </Text>
                {/**Vie all */}
                <TouchableOpacity>
                    <Text style={{
                        color: COLORS.gray,
                        ...FONTS.body4
                    }}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                         {/**Header **/}
                         { renderHeader() }
                         {/**Search Bar */}
                         { renderSearchBar()}
                         {/** recipe */}
                         { renderSeeRecipeCard()}
                         {/* Tending Section */}
                         { renderTrendingSection() }
                         {/**Category Header */}
                         { renderCategoryHeader() }
                    </View>
                }
                renderItem={({item}) => {
                    return(
                        <CategoryCard
                            containerStyle={{
                                marginHorizontal: SIZES.padding
                            }}
                            categoryItem={item}
                            onPress={() => navigation.navigate('Recipe', { recipe: item })}
                        />
                    )
                }}
                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 100
                        }}
                    />
                }
            />
        
        </SafeAreaView>
    )
}

export default Home;