import React from 'react';
import { translate } from 'react-translate';
import {
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from 'react-native-image-gallery';
import { getComicsDetails, getComicsPages } from './../../actions/comics';
import Typography from './../../components/Typography';

class ComicsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            loading: true,
            details: null,
            isOpen: false,
            pageIndex: 0
        };
    }

    navigateBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    closeGallery = () => this.setState({ isOpen: false });

    openGallerry = () => this.setState({ isOpen: true });

    saveCurrentIndex = pageIndex => this.setState({ pageIndex });

    getDetails = async(id) => {
        const { actions } = this.props;

        const result = await actions.getComicsDetails(id);
    
        if (!result) return;

        const details = result.pop();
    
        this.setState({ details });
    };

    getPages = async(id) => {
        const { actions } = this.props;

        const list = await actions.getComicsPages(id);
    
        if (!Array.isArray(list)) return;

        this.setState({ 
            list: list.map(({ image }) => ({
                source: { uri: image }
            }))
        });
    };

    renderDetails = () => {
        const { details } = this.state;

        if (!details) return null;

        const { 
            name,
            desc,
            cover
        } = details;

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity
                    onPress={this.openGallerry}
                    activeOpacity={1}
                >
                    <Image
                        style={styles.slideImage}
                        source={{ uri: cover }}
                    />
                    <View style={styles.filter} />
                    <Image
                        style={styles.playIcon}
                        source={require('./../../assets/icons/play-button.png')}
                    />
                </TouchableOpacity>
                <Typography
                    type={'headline1'}
                    style={styles.title}

                >
                    {name}
                </Typography>
                <Typography style={styles.desc}>
                    {desc}
                </Typography>
            </ScrollView>
        );
    };

    renderComicsPages = () => {
        const { list, pageIndex } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Gallery
                    style={styles.galleryWrapper}
                    data={list}
                    onPageSelected={this.saveCurrentIndex}
                />
                <View style={styles.galleryheader}>
                    <View style={styles.currentPage}>
                        <Typography style={{ color: '#fff' }}>
                            {`${pageIndex + 1} / ${list.length}`}
                        </Typography>
                    </View>
                    <TouchableOpacity
                        onPress={this.closeGallery}
                        activeOpacity={0.5}
                        style={styles.closeGallerryIconWrapper}
                    >
                        <Image
                            style={styles.closeGallerryIcon}
                            source={require('./../../assets/icons/close.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    init = async() => {
        const { route: { params: { id } } } = this.props;

        await this.getDetails(id);

        await this.getPages(id);
    
        this.setState({ loading: false });
    };

    componentDidMount = () => this.init();

    render = () => {
        const { loading, isOpen } = this.state;

        if (isOpen) return this.renderComicsPages();

        return (
            <SafeAreaView style={styles.wrapper}>
                {
                    loading ? (
                        <View style={styles.flex}>
                            <ActivityIndicator size={0} color={'#C8C8C8'} />
                        </View>
                    ) : this.renderDetails()
                }
                <TouchableOpacity
                    onPress={this.navigateBack}
                    activeOpacity={0.5}
                    style={styles.closeIconWrapper}
                >
                    <Image
                        style={styles.closeIcon}
                        source={require('./../../assets/icons/cancel.png')}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filter: {
        backgroundColor: '#000',
        position: 'absolute',
        width: '100%',
        height: 500,
        opacity: 0.2,
        borderRadius: 10
    },
    playIcon: {
        position: 'absolute',
        width: '100%',
        bottom: 40,
        right: 20,
        width: 60,
        height: 60
    },
    galleryheader: {
        position: 'absolute',
        width: '100%',
        top: 0,
        right: 0,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between'
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#8F00FF',
        position: 'relative'
    },
    contentContainer: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30,
        paddingBottom: 100
    },
    slideImage: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 10
    },
    title: {
        marginBottom: 10,
        color: '#fff'
    },
    desc: {
        color: '#fff'
    },
    currentPage: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeGallerryIconWrapper: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeGallerryIcon: {
        width: 20,
        height: 20
    },
    closeIconWrapper: {
        position: 'absolute',
        bottom: 25,
        borderRadius: 60,
        alignSelf: 'center'
    },
    closeIcon: {
        width: 60,
        height: 60,
    },
    galleryWrapper: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative'
    }
});

const mapDispatchToProps = dispatch => ({
    actions: {
        getComicsDetails: bindActionCreators(getComicsDetails, dispatch),
        getComicsPages: bindActionCreators(getComicsPages, dispatch)
    }
});
const mapStateToProps = ({}) => ({});
const translated = translate('ComicsPage')(ComicsPage);
export default connect(mapStateToProps, mapDispatchToProps)(translated);
