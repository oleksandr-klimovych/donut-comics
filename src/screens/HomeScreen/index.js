import React from 'react';
import { translate } from 'react-translate';
import { StyleSheet, View, Image, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from './../../components/Typography';
import { getComicsesList } from './../../actions/comics';

const { width } = Dimensions.get('window');

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeSlide: 0,
            list: [],
            loading: true
        };
    }

    setIndex = activeSlide => this.setState({ activeSlide });

    chooseItem = id => {
        const { navigation: { navigate } } = this.props;
        navigate('ComicsPage', { id });
    };

    _renderItem = ({
        item: {
            name,
            cover,
            edition_lang_id
        }
    }) => (
        <TouchableOpacity
            onPress={() => this.chooseItem(edition_lang_id)}
            activeOpacity={1}
            style={styles.slideButton}
        >
            <View
                key={`${edition_lang_id}_${name}`}
                style={styles.slide}
            >
                <Image
                    style={styles.slideImage}
                    source={{ uri: cover }}
                />
                <View style={styles.slideBunner}>
                    <Typography style={styles.slideBunnerText}>
                        {name}
                    </Typography>
                </View>
            </View>
        </TouchableOpacity>
    );

    init = async() => {
        const { actions } = this.props;

        const list = await actions.getComicsesList();
    
        this.setState({ loading: false });
    
        if (!Array.isArray(list)) return;
    
        this.setState({ list });
    };

    componentDidMount = () => this.init();

    render = () => {
        const {
            list,
            loading
        } = this.state;

        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.flex}>
                {
                    loading ? (
                        <ActivityIndicator
                            size={0}
                            color={'#C8C8C8'}
                        />
                    ) : (
                        <Carousel
                            layout={'default'}
                            ref={ref => this.carousel = ref}
                            data={list || []}
                            sliderWidth={width}
                            itemWidth={width - width*30/100}
                            renderItem={this._renderItem}
                            onSnapToItem={this.setIndex} 
                        />
                    )
                }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#8F00FF',
        alignItems: 'center'
    },
    flex: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide: {
        backgroundColor:'floralwhite',
        borderRadius: 10,
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    slideButton: {
        height: '85%'
    },
    slideImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        resizeMode: 'cover'
    },
    slideBunner: {
        backgroundColor: '#f8ee02',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 2,
        padding: 20
    },
    slideBunnerText: {
        textAlign: 'center'
    }
});

const mapDispatchToProps = dispatch => ({
    actions: {
        getComicsesList: bindActionCreators(getComicsesList, dispatch)
    }
});
const mapStateToProps = ({}) => ({});
const translated = translate('HomeScreen')(HomeScreen);
export default connect(mapStateToProps, mapDispatchToProps)(translated);
