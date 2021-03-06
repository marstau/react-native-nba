/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';

import {
    View,
    Text,
    WebView,
    StyleSheet,
    BackHandler
} from 'react-native';

import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';
import Toast from '../components/toast';

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url.url,
            title: this.props.url.title,
            loading: true,
            isBackButtonEnable: false,
            isForwardButtonEnable: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={CommonUtil.isEmpty(this.state.title) ? '我的博客' : this.state.title}
                    showLeftState={true}
                    showRightState={true}
                    showRightImage={true}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back_left.png')}
                    rightImageSource={require('../image/close.png')}
                    onPress={() => this.goBack()}
                    onPressRight={() => this.hidePersonInfo()}/>
                <WebView
                    ref="webview"
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    mixedContentMode={'compatibility'}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}/>
            </View>
        )
    }

    hidePersonInfo = () => {
        getNavigator().pop();
    };

    _onNavigationStateChange(navState) {
        console.log(navState);
        this.setState({
            url: navState.url,
            title: navState.title,
            loading: navState.loading,
            isBackButtonEnable: navState.canGoBack,
            isForwardButtonEnable: navState.canGoForward
        })
    }

    goBack = () => {
        if (this.state.isBackButtonEnable) {
            this.refs.webview.goBack();//返回上一个页面
            return true;//true 系统不再处理 false交给系统处理
        } else {
            this.hidePersonInfo();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: CommonUtil.getScreenHeight(),
        width: CommonUtil.getScreenWidth()
    },
    webView: {
        height: CommonUtil.getScreenHeight(),
        width: CommonUtil.getScreenWidth()
    }
});

export default PersonInfo;