<template>
	<view class="page flex-col">
		<view class="block_1 flex-col" v-if="!show2">
			<scroll-view class="content-scroll" scroll-y :scroll-top="scrollTop" @scroll="onScroll">
				<!-- 页面主要内容 -->
				<view class="content">
					<view class="box">
						<view class="bg">
						</view>
						<view class="weizhi" v-if="showHua" :style="buzou == 1 ? 'z-index: 110':'z-index: 100'"
							@click="pinduoduo">
							<LottieAnimation4></LottieAnimation4>
							<view class="pddAccount">
								${{pddAccount || 0}}
							</view>
						</view>
						<view class="fl_ju header">
							<view class="fl_al head_left" @click="gomy">
								<image :src="avatar.avatar" v-if="avatar.avatar" mode=""></image>
								<view class="avatar" :style="{ background: gradient }" v-else>
									<text v-if="userInfo.firstName">{{userInfo.firstName[0]}}</text>
								</view>
								<text>{{userInfo.firstName}}</text>
							</view>

							<view class="fl_al ">
								<!-- 			<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/bg-ie-browser.png" @click="goHtml" class="yuyan2"
									style="margin-right: 50rpx;" mode="aspectFit"></image> -->
								<view class="yuyan" @click="showYy = true">
									<!-- <view class="yytext">{{_i18n.locale == 'en-US'?'en':'cn'}}</view> -->
								</view>
							</view>
						</view>
						<!-- 余额内容 -->
						<view class="kuang">
							<view class="topxx fl_ju">
								<view class="xx_left fl_al">
									<view class="title">
										{{ i18n.home.title1}}
									</view>
								</view>
								<view class="xx_right fl_al" @click="zichan">
									<text>{{ i18n.home.mingxi}}</text>
									<image
										src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/right.png"
										mode=""></image>
								</view>
							</view>
							<view class="cenxx fl_ju">
								<view class="fl_al">
									<text class="dengyu" @click="zichan">≈</text>
									<view @click="zichan">
										<text class="shu" v-if="assets.exchangeType == 'USD'">{{total_amount}}</text>
										<text class="shu"
											v-else-if="assets.exchangeType == 'PHP'">{{(assets.exchangeMoney).toFixed(2)}}</text>
										<text class="shu" v-else>{{(assets.exchangeMoney).toFixed(2)}}</text>
									</view>

									<view class="fl_al" style="margin-top: 20rpx;" @click="showBz = true">
										<view class="danwei">{{assets.exchangeType}}</view>
										<image
											src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/arrow-down.png"
											style="width: 40rpx;height: 40rpx;" mode=""></image>
									</view>
								</view>
								<view class="fl_al" style="margin-right: 10rpx;">
									<view class="btnicon" @click="tixian">
										<image
											src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/index_icon2.png"
											mode=""></image>
										<view class="titleq">
											{{i18n.homeAssets.btn2}}
										</view>
									</view>
									<view class="btnicon" @click="chongzhi">
										<image
											src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/index_icon3.png"
											mode=""></image>
										<view class="titleq">
											{{i18n.homeAssets.btn1}}
										</view>
									</view>
								</view>
							</view>
							<view style="margin-top: 18rpx;">
								<!-- 			<mxio-scroll-x :dataSource="dataSource" :colList="11" :column="4"
									@scrollItemEmitsClick="scrollItemEmitsClick">
								</mxio-scroll-x> -->
							</view>
						</view>
						<!-- 		<view class="gonggao">
							<u-notice-bar :text="text1" color="#333"
								bgColor="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-notice-bar>
						</view> -->
						<!-- <block v-if="openStatus != 'close'"> -->
						<!-- <view class="tishen" v-if="showCj && allTime > 0">
						</view>
						v-else -->
						<view class="lottery fl_ju"
							:style="buzou == 2 ? 'position: relative;z-index: 110;margin-top: 24rpx;':'margin-top: 24rpx;'"
							@click="gambling">
							<view class="lottery_left">
								<view class="jiangchi fl_cen">
									<view class="container">
										<text class="number-3d">{{totalAmount}}</text>
									</view>
									<view class="containerRight">
										<view class="fl_al add animated-element" v-if="chazhi != 0">
											<image
												src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/top.png"
												mode=""></image>
											<view class="addshu">
												+{{chazhi}}
											</view>
										</view>
										<view class="jcdw">
											USDT
										</view>
									</view>
								</view>
								<view class="djs fl_cen" v-if="allTime > 0">
									<view class="djsson fl_cen">
										{{ timeDiff.hours }}
									</view>
									<view class="djsson fl_cen">
										{{ timeDiff.hours2 }}
									</view>
									<text>:</text>
									<view class="djsson fl_cen">
										{{ timeDiff.minutes }}
									</view>
									<view class="djsson fl_cen">
										{{ timeDiff.minutes2 }}
									</view>
									<text>:</text>
									<view class="djsson fl_cen">
										{{ timeDiff.seconds }}
									</view>
									<view class="djsson fl_cen">
										{{ timeDiff.seconds2 }}
									</view>
								</view>
								<view class="djs" v-else>
									{{i18n.gambling.tishi4}}
								</view>
							</view>
							<view class="btn">
								{{i18n.home.btn}}
								<br />
								{{i18n.home.btn2}}
							</view>
						</view>
						<!-- </block> -->
						<!-- @click="demo" -->
						<view class="title2 fl_ju" style="margin-top: 16rpx;">
							<view class="fl_al">
								<view class="bian"></view> {{ i18n.home.title2}}
							</view>
						</view>
						<block>
							<OpenADAdvertisement :zoneId="286" :publisherId="325" :sendLotteryCount="0"
								:userInfo="userInfo" :appVersion="'1.0.1'" @adTaskFinished="handleAdTaskFinished"
								@adClosed="handleAdClosed" />
						</block>
						<!-- 			<view class="title2 fl_ju" style="margin-top: 16rpx;">
							<view class="fl_al" @click="demo2">
								<view class="bian"></view> {{ i18n.home.title2}}2
							</view>
						</view> -->
						<!-- 			<view class="title2 fl_ju" style="margin-top: 16rpx;">
							<view class="fl_al" @click="demo3">
								<view class="bian"></view> {{ i18n.home.title2}}震动3大
							</view>
						</view> -->

						<!-- 		<view class="title2 fl_ju" style="margin-top: 20rpx;">
							<view class="fl_al">
								<view class="bian"></view> 竞猜
							</view>
							<view class="gengduo" @click="jingcai">
								更多>
							</view>
						</view> -->
						<!-- 		<view class="kuang" style="margin-bottom: 20rpx;">
							<view class="fl_ju">
								<view class="fl_al wenti">
									<image src="https://profile.teligram.workers.dev/superyang9988/photo" mode="">
									</image>
									<text>will biden finish his term？</text>
								</view>
								<l-circularProgress :fontShow="false" :percent="50" type="halfCircular" :lineWidth="3"
									gradualColor="#4A85FF" progressColor="#4A85FF" fontColor="#19be6b"
									bgColor="#F1EFFD">
									<view class="gailv">
										<view class="bfb">
											50%
										</view>
										chance
									</view>
								</l-circularProgress>
							</view>
							<view class="fl_ju" style="margin: 30rpx 0;">
								<u-button shape="circle"
									:customStyle="{width:'310rpx',background:'#4A85FF',color:'#fff',border:'1px solid #4A85FF'}">
									Bet Yes
									<u-icon name="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/yes.png" style="margin-left: 10rpx;" size="15"
										color="#fff"></u-icon>
								</u-button>
								<u-button shape="circle"
									:customStyle="{width:'310rpx',border:'1px solid #333333',color:'#fff',background:'#FC575F',border:'1px solid #FC575F'}">
									Bet No
									<u-icon name="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/no.png" style="margin-left: 10rpx;" size="15"
										color="#fff"></u-icon>
								</u-button>
							</view>
							<view class="btns fl_ju">
								<view class="btn_left fl_al">
									<image src="../../static/icon/USDT.png" mode=""></image>
									<text>$80.2K Bet</text>
								</view>
								<view class="btn_right fl_al">
									<view class="liwu fl_al">
										<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/liwu.png" mode=""></image>
										<text>分享领取礼物</text>
									</view>
									<view class="pl fl_al">
										<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/jiaoliu.png" mode=""></image>
									</view>
									<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/shoucang.png" class="shoucang" mode=""></image>
								</view>
							</view>
						</view> -->
						<view class="rwlist" :style="buzou == 3 ? 'position: relative;z-index: 110;':'z-index: 0;'">
							<view class="son fl_ju" v-for="(item,index) in donglist" :key="item.activityId"
								@click="hdSend(item)">
								<view class="son_left fl_al">
									<image :src="item.avatar" v-if="item.avatar" mode=""></image>
									<image
										src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/avatar.png"
										v-else mode=""></image>
									<view class="xinxi">
										<view class="title">
											{{item.projectName}}
										</view>
										<view class="description">
											{{item.activityTitle}}
										</view>
										<view class="shuju fl_al">
											<view class="" style="position: relative;">
												<view class="shine-wrapper fl_cen">
													<image
														src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/usdt.png"
														mode=""></image>
												</view>
											</view>
											<view class="qian">
												{{item.money}}
											</view>
										</view>
									</view>
								</view>
								<view class="son_right fl_cen" v-if="item.canRecieve">
									{{i18n.home.btn3}}
									<image
										src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/right2.png"
										mode=""></image>
								</view>
								<view class="son_right2 fl_cen" v-else @click.stop="doShareRedpacketShare(item)">
									{{i18n.redpacketDetail.btn}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
		<!-- 		<image src="../../static/images/pdd/hongbao.jpg" @click="pddRukou" v-if="!showPdd && minpdd"
			class="pddrk animate__animated animate__swing animate__infinite" mode=""></image> -->
		<!-- 		<u-overlay :show="showJls" @click="pinduoduo">
			<LottieAnimation3 class="parachute" :class="{ 'start-drop': isDropping }">
			</LottieAnimation3>
		</u-overlay> -->
		<!-- 		<view class="" v-if="showJls" @click="pinduoduo">
			<LottieAnimation3 class="parachute" :class="{ 'start-drop': isDropping }">
			</LottieAnimation3>
		</view> -->
		<!-- v-if="showRk" -->

		<!-- 		<u-popup :show="showPdd" mode="center" closeable closeIconPos="top-left" :closeOnClickOverlay="false"
			bgColor="transparent" @close="close">
			<view class="guanka animate__animated animate__pulse animate__infinite">
				<view class="box1">
					<view class="renwu">
						<view class="title">恭喜获得 <text class="gl">现金卡</text></view>
						<view class="kuangnei">
							<view class="maxtitle">
								天啊! 你太幸运啦!
							</view>
							2.99 USDT 现金卡 1 张
						</view>
					</view>
					<view class="btn" style="margin-top: 100rpx;">
						<u-button type="primary" @click="pinduoduo" text="立即领取"
							:customStyle="{width:'422rpx',height:'112rpx',color:'#fff',margin:'auto',
					fontSize: '48rpx',background: 'linear-gradient( 242deg, #F9B330 0%, #E5574F 91%)',border:'none',borderRadius:'350rpx'}"></u-button>
					</view>
				</view>
			</view>
		</u-popup> -->
		<!-- 		<u-popup :show="showPdd2" mode="center" closeable closeIconPos="top-left" closeOnClickOverlay
			bgColor="transparent" @close="close" @open="open">
			<view class="guanka animate__animated animate__pulse animate__infinite">
				<view class="box1 ">
					<image src="../../static/images/pdd/hongbao.jpg" mode=""></image>
					<view>是否前往领取奖励</view>
					<view class="btn">
						<u-button type="primary" text="去领取" @click="pinduoduo"></u-button>
					</view>
				</view>
			</view>
		</u-popup> -->
		<!-- 语言切换弹框 -->
		<u-action-sheet :actions="list" :round="'30rpx'" @select="selectClickYy" @close="popupClose" :title="title"
			:safeAreaInsetBottom="true" :show="showYy"></u-action-sheet>
		<u-toast ref="uToast" />
		<!-- 流程图弹窗 -->
		<!-- 	<u-popup :show="show" @close="close" mode="center" :round="10" closeable>
			<view class="popupShow">
				<image style="width: 100%;" src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/c%402x.png" mode="widthFix"></image>
				<view>
					<u-checkbox-group v-model="checkboxShow" placement="column">
						<u-checkbox shape="circle" :customStyle="{margin: '20rpx 0',justifyContent: 'center'}"
							label="不再弹出" name="true">
						</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup> -->
		<view class="overlay" v-show="show2">
			<LottieAnimation />
		</view>
		<u-overlay :show="showJls" :z-index="100">
			<view class="yiwz" v-if="buzou == 1" style="top: 30rpx;left: 240rpx;">
				<view class="pop">
					{{i18n.page.text61}}
				</view>
				<view class="son_right" @click="buzou = 2">
					{{i18n.quaneti.one.renwu.btn}}
				</view>
			</view>
			<view class="yiwz" v-if="buzou == 2" style="top: 600rpx;left: 320rpx;">
				<view class="pop2">
					{{i18n.page.text63}}
				</view>
				<view class="son_right" @click="buzou = 3">
					{{i18n.quaneti.one.renwu.btn}}
				</view>
			</view>
			<view class="yiwz" v-if="buzou == 3" style="top: 470rpx;left: 320rpx;">
				<view class="son_right" @click="yindao">
					{{i18n.home.btn4}}
				</view>
				<view class="pop3">
					{{i18n.page.text62}}
				</view>
			</view>
		</u-overlay>
		<!-- 		<block v-if="openStatus != 'close' && allTime > 0">
			<u-overlay :show="showCj" @click="guanbi">
				<LottieAnimation2 />
				<view class="warp" :class="!showCj2?'animateShiftShrink':''">
					<view class="lottery2 fl_cen" style="margin-top: 24rpx;" @click="gambling">
						<view class="shine-effect">
						</view>
						<view class="lottery_left">
							<view class="jiangchi fl_cen">
								<view class="container">
									<text class="number-3d">{{totalAmount}}</text>
								</view>
								<view class="containerRight">
									<view class="fl_al add animated-element" v-if="chazhi != 0">
										<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/top.png" mode=""></image>
										<view class="addshu">
											+{{chazhi}}
										</view>
									</view>
									<view class="jcdw">
										USDT
									</view>
								</view>
							</view>
							<view class="djs fl_cen" v-if="allTime > 0">
								<view class="djsson fl_cen">
									{{ timeDiff.hours }}
								</view>
								<view class="djsson fl_cen">
									{{ timeDiff.hours2 }}
								</view>
								<text>:</text>
								<view class="djsson fl_cen">
									{{ timeDiff.minutes }}
								</view>
								<view class="djsson fl_cen">
									{{ timeDiff.minutes2 }}
								</view>
								<text>:</text>
								<view class="djsson fl_cen">
									{{ timeDiff.seconds }}
								</view>
								<view class="djsson fl_cen">
									{{ timeDiff.seconds2 }}
								</view>
							</view>
							<view class="djs" v-else>
								{{i18n.gambling.tishi4}}
							</view>
						</view>
					</view>
					<view class="errer" v-if="showCj2">
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/error.png" mode=""></image>
					</view>
				</view>
			</u-overlay>
		</block> -->

		<view class="hide-tabbar" v-if="show2"></view>
		<u-tabbar :value="0" :fixed="true" :placeholder="true" activeColor="#FC575F" :safeAreaInsetBottom="true"
			:border="false">
			<u-tabbar-item :text="i18n.home.title">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/home2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/home.png">
				</image>
			</u-tabbar-item>
			<!-- 		<u-tabbar-item text="" @click="sendpacket" style="margin-bottom: 80rpx;">
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 132rpx;height: 132rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/send.png"></image>
			</u-tabbar-item> -->
			<!-- <u-tabbar-item :text="i18n.guessing.title" @click="goguessing">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/guessing2.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/guessing.png"></image>
			</u-tabbar-item> -->
			<u-tabbar-item :text="i18n.market.title" @click="gomarket">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/market2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/market.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item :text="i18n.my.title" @click="gomy">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/my2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/my.png">
				</image>
			</u-tabbar-item>
		</u-tabbar>
		<!-- 币种切换 -->
		<u-picker :show="showBz" closeOnClickOverlay :cancelText="i18n.chargePsw.reset.btn1"
			:confirmText="i18n.sendpacket.tiaojian.btn2" @close="close" @cancel="close" @confirm="confirm" :columns="[
					[i18n.home.bz1,i18n.home.bz2, i18n.home.bz3]
				]"></u-picker>
	</view>
</template>

<script>
	import {
		getUrlParam
	} from "../../utils/util.js";
	import {
		setGroupRedpacketIdLocal,
		removeShareActivityIdLocal,
		removeGroupRedpacketIdLocal,
		setShareActivityIdLocal,
		removeShareUserIdLocal,
		setShareUserIdLocal
	} from "@/utils/localData.js";
	import {
		redpacketQueryActivityByPage,
		queryLotteryCountdown,
		lotteryShareInfo,
		lotteryOpenStatus,
		cooperationApplicationPermission,
		statisticsInterface
	} from '@/api/group_receive_redpacket.js';
	import {
		handleReqDoSomethingInActivity
	} from '@/api/single_receive_redpacket.js';
	import {
		getAccountInfo,
		setPop,
		queryPermission,
		queryUserInfo,
		recordTaskInfo,
		inviteUserList,
		queryAccountInfo
	} from '@/api/index.js';
	import {
		encryption,
		handleEditUserLanguage
	} from '@/api/user.js';
	import store from "@/store/index.js";
	import gaMixin from '@/components/ga.js'; // 引入公共脚本
	import HorizontalScroll from '@/components/HorizontalScroll.vue'
	import LottieAnimation from '@/components/LottieAnimation.vue'
	import LottieAnimation2 from '@/components/LottieAnimation2.vue'
	import LottieAnimation3 from '@/components/LottieAnimation8.vue'
	import LottieAnimation4 from '@/components/LottieAnimation10.vue'
	import UserAgentService from '@/utils/service'
	import OpenADAdvertisement from '@/components/OpenADAdvertisement.vue'
	import {
		Debounce
	} from '@/utils/debounce.js';
	import {
		addSeconds,
		format
	} from 'date-fns';
	export default {
		mixins: [gaMixin], // 使用mixins将公共方法混入到当前组件
		components: {
			HorizontalScroll,
			LottieAnimation,
			LottieAnimation2,
			LottieAnimation3,
			LottieAnimation4,
			OpenADAdvertisement
		},
		data() {
			return {
				minpdd: false, //缩小拼多多
				showPdd: false, //拼多多状态
				showPdd2: false, //拼多多状态
				miao: 3, //拼多多倒计时
				showBz: false, //币种切换状态
				columns: [
					['美元 USD', '比索 PHP', '卢比 INR']
				], //币种列表
				bzType: uni.getStorageSync('bzType'), //选择币种
				assets: {}, //币种单位
				showCj: false, //抽奖弹窗1
				showCj2: true, //抽奖弹窗2
				queryData: {}, //获取步数信息
				sumData: {}, //拼多多邀请信息
				title2: 'Hello',
				list: [{
						name: '中文简体',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'English',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'Tagalog',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'Русский',
						color: '#303133',
						fontSize: '16'
					},

				], //语言列表
				// 提交数据
				redpacketFrom: {
					accountType: 'USD',
					exchangeMoney: ''
				},
				popupShow: false,
				title: '', //语言标题
				visibleWidth: '',
				totalWidth: '',
				scrollLeft: '',
				showYy: false,
				popupTitle: '红包类型',
				popupList: {
					label: 0,
					list: [{
							name: '普通红包'
						},
						{
							name: '拼手气红包(金额随机)'
						},
					]
				},
				name1: {
					accountTypeInfo: 'USD',
					exchangeMoney: ''
				},
				avatar: uni.getStorageSync('user'),
				tguser: uni.getStorageSync('Tguser'),
				text1: '恭喜XX用户竞猜获得 XXX USDT！',
				dataSource: [{
						label: '充值', // 文本
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/chongzhi.png', // 图标 ，默认image标签，使用slot可自定义
					},
					{
						label: '提现',
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/tixian.png', // 图标 ，默认image标签，使用slot可自定义
					},
					{
						label: 'TORN能量',
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/nengliang.png', // 图标 ，默认image标签，使用slot可自定义
					},
					{
						label: '飞机会员',
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/feiji.png', // 图标 ，默认image标签，使用slot可自定义
					}
				],
				total_amount: 0,
				accountList: [],
				isSetChargePsw: uni.getStorageSync('isSetChargePsw'),
				show: false,
				show2: false,
				showlo: true,
				show3: false,
				checkboxShow: ['true'],
				isopen: false,
				isopen1: '',
				isopen2: '',
				isTabBarVisible: false, // 默认tabbar是可见的
				images: ['https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png'
				],
				userInfo: uni.getStorageSync('user'),
				huobiList: [],
				donglist: [],
				showTs: false,
				showHua: false,
				huaIndex: 0,
				type: '',
				hash: '',
				userAgent: '',
				showStop: false,
				deviceType: '',
				gradient: '',
				zuoyouBox: false, //最左侧和最右侧true则可以点击触发
				jishu: 0, //第一次不算
				scrollTop: 0,
				debounce: new Debounce(), //状态锁
				timeDiff: {
					hours: '0',
					hours2: '0',
					minutes: '0',
					minutes2: '0',
					seconds: '0',
					seconds2: '0',
				}, //奖池倒计时
				totalAmount: 0, //奖池金额
				allTime: 0, //奖池总秒数
				formatTime: '', //奖池结束文描
				token: uni.getStorageSync('token'), //缓存token
				pollingInterval: 1000, //抽奖初始轮询时间
				chazhi: 0, //奖池更新多少钱
				openStatus: 'close', //加载层
				isPageActive: false, // 页面激活状态
				permission: false, //商户端是否有权限
				safeAreaInset: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}, //安全区
				isDropping: false, //降落伞特效
				showJls: false, //降落伞状态
				buzou: 0, //引导步骤
				timer: null, //定时器
				pddAccount: 0 //当前pdd余额
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			rechargeAmount() {
				return this.$store.state.rechargeAmount;
			},
			password() {
				return this.$store.state.password;
			},
			userTGID: {
				get() {
					return this.$store.state.user.userTGID
				},
				set(val) {
					this.$store.commit('user/updateUserTGID', val)
				}
			},
			firstName: {
				get() {
					return this.$store.state.user.firstName
				},
				set(val) {
					this.$store.commit('user/updateFirstName', val)
				}
			},
			userName: {
				get() {
					return this.$store.state.user.userName
				},
				set(val) {
					this.$store.commit('user/updateUserName', val)
				}
			},

		},
		onUnload() {
			this.isPageActive = false
			this.clearTimers()
		},
		onReady() {
			// 页面准备好后开始动画
			setTimeout(() => {
				this.isDropping = true
			}, 100)
		},
		onHide() {
			this.isPageActive = false
			this.clearTimers()
		},
		beforeDestroy() {
			this.clearTimers()
		},
		onLoad(options) {
			const needShowLoading = uni.getStorageSync('needShowLoading')
			if (needShowLoading) {
				this.show2 = true
			}
			//  else {
			// 	this.showRk = true
			// queryUserInfo().then(res => {
			// 	if (res.data && res.data.code === 0) {
			// 		console.log(res.data.data)
			// 		this.queryData = res.data.data
			// 	}
			// })
			// }
			// if (window.Telegram?.WebApp?.Accelerometer) {
			// 	// 启动加速度计并配置参数
			// 	window.Telegram.WebApp.Accelerometer
			// 		.start({
			// 			frequency: 90 // 设置数据更新频率(每秒次数)
			// 		}, (started) => {
			// 			if (started) {
			// 				console.log('加速度计启动成功');
			// 				// 检测加速度数据
			// 				this.checkAccelerometer();
			// 			} else {
			// 				console.log('加速度计启动失败');
			// 			}
			// 		});
			// }
			// 页面安全距离
			// if (window.Telegram?.WebApp) {
			// 	this.safeAreaInset = window.Telegram.WebApp.safeAreaInset;
			// }

			// 监听关闭请求
			// if (window.Telegram?.WebApp) {
			// 	Telegram.WebApp.setClosingBehavior({
			// 		button: true
			// 	}); // 启用关闭按钮行为设置
			// 	Telegram.WebApp.MainButton.show();
			// 	// 	// 监听点击
			// 	Telegram.WebApp.MainButton.onClick(() => {
			// 		// 处理点击
			// Telegram.WebApp.showPopup({
			// 	title: 'Warning',
			// 	message: 'Changes that you made may not be saved.',
			// 	buttons: [{
			// 			id: 'cancel',
			// 			type: 'default',
			// 			text: 'Cancel'
			// 		},
			// 		{
			// 			id: 'close',
			// 			type: 'destructive',
			// 			text: 'Close anyway'
			// 		}
			// 	]
			// }, (buttonId) => {
			// 	if (buttonId === 'close') {
			// 		Telegram.WebApp.close();
			// 	}
			// });
			// 	});
			// }
		},
		onShow() {
			console.log('走这里')
			this.jishu = 0
			this.type = uni.getStorageSync('i18n')
			this.donglist = []
			const cachedData = localStorage.getItem('donglist');
			if (cachedData) {
				this.donglist = JSON.parse(cachedData);
			}
			this.hdList()
			this.getAccountInfo(this.bzType);
			this.deviceType = uni.getStorageSync('deviceType')
			// 奖池
			this.isPageActive = true
			// 获取奖池状态
			this.checkLotteryStatus()
			if (window.Telegram) {
				Telegram.WebApp.BackButton.hide(); // 显示返回按钮
			}
			if (uni.getStorageSync('pddJls')) {
				this.pddhuidiao()
			} else {
				setTimeout(() => {
					this.pddhuidiao()
				}, 1000);
			}
		},
		mounted() {
			this.setRandomGradient();
			if (window.Telegram?.WebApp) {
				this.tg = window.Telegram.WebApp;

				// 启用关闭确认
				this.tg.enableClosingConfirmation();

				// 监听关闭事件
				this.tg.onEvent('close', () => {
					Telegram.WebApp.showPopup({
						title: '确认关闭',
						message: '确定要关闭吗？',
						buttons: [{
								id: 'close',
								type: 'destructive',
								text: '关闭'
							},
							{
								id: 'cancel',
								type: 'default',
								text: '取消'
							}
						]
					}, (buttonId) => {
						if (buttonId === 'close') {
							this.tg.close();
						}
					});
				});
			}
		},
		methods: {
			handleAdTaskFinished(e) {
				console.log('广告任务完成', e)
			},
			handleAdClosed(e) {
				console.log('广告播放完毕', e)
			},
			// 添加机器人到桌面
			async addToHomeScreen() {
				try {
					// 直接尝试添加到桌面
					const result = await window.Telegram.WebApp.addToHomeScreen();
					if (result?.isAdded) {
						return true;
					}
					return false;
				} catch (error) {
					console.error('Add to home screen failed:', error);
					this.$refs.uToast.error('失败')
					return false;
				}
			},
			// 跳转商户端
			goHtml() {
				uni.navigateTo({
					url: '/pages/index/applyFor'
				})
			},
			// 检查抽奖状态
			async checkLotteryStatus() {
				try {
					const res = await lotteryOpenStatus()
					if (res.data?.code === 0) {
						this.openStatus = res.data.data
						if (this.openStatus !== 'close') {
							this.initLotteryData()
						}
					}
				} catch (error) {
					console.error('检查抽奖状态失败:', error)
				}
			},
			// 初始化抽奖数据
			async initLotteryData() {
				try {
					// 获取倒计时
					const countRes = await queryLotteryCountdown()
					if (countRes.data?.code === 0) {
						this.allTime = countRes.data.data
						if (this.allTime === 0) {
							this.formatTime = this.i18n.gambling.tishi4
							this.clearTimers()
						} else {
							const futureDate = addSeconds(new Date(), this.allTime)
							this.startCountdown(format(futureDate, 'yyyy-MM-dd HH:mm:ss'))
							this.startPolling()
						}
					}

					// 获取奖池信息
					const poolRes = await lotteryShareInfo()
					if (poolRes.data?.code === 0) {
						this.totalAmount = poolRes.data.data.totalAmount
						uni.setStorageSync('totalAmount', this.totalAmount)
					}
				} catch (error) {
					console.error('初始化抽奖数据失败:', error)
				}
			},
			// 清理定时器
			clearTimers() {
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}
				if (this.pollingTimer) {
					clearInterval(this.pollingTimer)
					this.pollingTimer = null
				}
			},
			// 格式化数字
			formatNumber(num) {
				return num < 10 ? `0${num}` : String(num)
			},
			// 开始倒计时
			startCountdown(endTimeStr) {
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}

				const endTime = new Date(endTimeStr).getTime()

				this.timer = setInterval(() => {
					if (!this.isPageActive) {
						this.clearTimers()
						return
					}

					const now = new Date().getTime()
					const remainingTime = endTime - now

					if (remainingTime <= 0) {
						this.clearTimers()
						this.formatTime = this.i18n.gambling.tishi4
						return
					}

					// 更新显示时间
					this.updateTimeDisplay(remainingTime)
				}, 1000)
			},
			// 更新时间显示
			updateTimeDisplay(remainingTime) {
				const hours = Math.floor(remainingTime / (1000 * 60 * 60))
				const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
				const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

				const formattedHours = this.formatNumber(hours)
				const formattedMinutes = this.formatNumber(minutes)
				const formattedSeconds = this.formatNumber(seconds)

				const [h1, h2] = formattedHours.split('')
				const [m1, m2] = formattedMinutes.split('')
				const [s1, s2] = formattedSeconds.split('')

				this.timeDiff = {
					hours: h1,
					hours2: h2,
					minutes: m1,
					minutes2: m2,
					seconds: s1,
					seconds2: s2
				}
			},
			// 开始轮询
			startPolling() {
				this.updatePollingInterval()
				this.setPollingTimer()
			},
			// 更新轮询间隔
			updatePollingInterval() {
				let newInterval
				if (this.allTime <= 60) {
					newInterval = 1000 // 小于60秒，每秒轮询
				} else if (this.allTime <= 3540) {
					newInterval = 10000 // 小于3540秒，每10秒轮询
				} else {
					newInterval = 20000 // 大于3540秒，每20秒轮询
				}

				if (newInterval !== this.pollingInterval) {
					this.pollingInterval = newInterval
					if (this.pollingTimer) {
						this.setPollingTimer()
					}
				}
			},
			// 设置轮询定时器
			setPollingTimer() {
				if (this.pollingTimer) {
					clearInterval(this.pollingTimer)
					this.pollingTimer = null
				}

				this.pollingTimer = setInterval(() => {
					if (!this.isPageActive) {
						this.clearTimers()
						return
					}
					this.pollLotteryData()
				}, this.pollingInterval)
			},
			// 轮询获取数据
			async pollLotteryData() {
				try {
					// 获取最新倒计时
					const countRes = await queryLotteryCountdown()
					if (countRes.data?.code === 0) {
						this.allTime = countRes.data.data
						if (this.allTime === 0) {
							this.formatTime = this.i18n.gambling.tishi4
							this.clearTimers()
							return
						}
						// 更新轮询间隔
						this.updatePollingInterval()
						// 重新开始倒计时
						const futureDate = addSeconds(new Date(), this.allTime)
						this.startCountdown(format(futureDate, 'yyyy-MM-dd HH:mm:ss'))
					}

					// 获取最新奖池金额
					const poolRes = await lotteryShareInfo()
					if (poolRes.data?.code === 0) {
						const newAmount = poolRes.data.data.totalAmount
						const oldAmount = uni.getStorageSync('totalAmount')

						if (newAmount !== oldAmount) {
							this.chazhi = (Number(newAmount) - Number(oldAmount)).toFixed(3)
							setInterval(() => {
								this.chazhi = 0
							}, 4000)
						} else {
							this.chazhi = 0
						}

						this.totalAmount = newAmount
						uni.setStorageSync('totalAmount', newAmount)
					}
				} catch (error) {
					console.error('轮询数据失败:', error)
				}
			},
			// -----------------------------------------------
			// 奖池页面
			gambling() {
				uni.navigateTo({
					url: '/pages/index/gambling'
				})
			},

			// 随机头像背景
			setRandomGradient() {
				const randomColor = () => {
					const r = Math.floor(Math.random() * 256);
					const g = Math.floor(Math.random() * 256);
					const b = Math.floor(Math.random() * 256);
					return `rgba(${r}, ${g}, ${b}, 1)`;
				};
				const color1 = randomColor();
				const color2 = randomColor();
				const color3 = randomColor();
				const color4 = randomColor();

				const gradient =
					`linear-gradient(45deg, ${color1} 0%, ${color2} 33%, ${color3} 66%, ${color4} 100%)`;
				this.gradient = gradient;
			},
			// 0是总点击量，3统计邀请链接进入点击量
			statistic(e) {
				statisticsInterface(`redpacket_manage/statisticsInterface/${e}/0`).then(res => {}).catch(
					errors => {});
			},
			// 2统计分享次数
			statisticFx(e) {
				statisticsInterface(`redpacket_manage/statisticsInterface/${e}/2`).then(res => {}).catch(
					errors => {});
			},
			statisticOk(e) {
				statisticsInterface(`redpacket_manage/statisticsInterface/${e}/1`).then(res => {}).catch(
					errors => {});
			},

			// 查看红包详情
			shareDetails(e) {
				removeGroupRedpacketIdLocal()
				setGroupRedpacketIdLocal(e.redpacketId || '') //放在本地缓存
				removeShareActivityIdLocal()
				setShareActivityIdLocal(e.activityId || '') //放在本地缓存
				removeShareUserIdLocal()
				setShareUserIdLocal(e.shareUserId || '') //放在本地缓存
				if (this.zuoyouBox) {
					uni.navigateTo({
						url: '/pages/group_receive_redpacket/share_details?&type=1'
					})
					return
				}
				if (this.deviceType == 'Mobile App') {
					uni.navigateTo({
						url: '/pages/group_receive_redpacket/share_details?&type=1'
					})
					return
				}
				if (this.showStop) {
					this.showStop = false
					return
				}
				this.showStop = false
				uni.navigateTo({
					url: '/pages/group_receive_redpacket/share_details?&type=1'
				})
			},
			// 参与活动事件
			hdSend(e) {
				console.log(e)
				removeGroupRedpacketIdLocal()
				setGroupRedpacketIdLocal(e.redpacketId || '') //放在本地缓存
				removeShareActivityIdLocal()
				setShareActivityIdLocal(e.activityId || '') //放在本地缓存
				removeShareUserIdLocal()
				setShareUserIdLocal(e.shareUserId || '') //放在本地缓存
				// 统计活动总点击量
				this.statistic(e.activityId)
				if (e.canRecieve) {
					this.openGroupRedPacket(e)
				} else {
					this.shareDetails(e)
				}
			},
			// 缩短截止时间
			formattedEndTime(e) {
				const date = new Date(e);
				const day = date.getDate().toString().padStart(2, '0');
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const year = date.getFullYear().toString().slice(-2); // 获取年份的最后两位
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}`;
			},
			// 首页活动列表
			hdList() {
				redpacketQueryActivityByPage(1, 10).then(res => {
					if (res.data && res.data.code === 0) {
						if (res.data.data.length == 0) {
							this.donglist = []
							localStorage.setItem('donglist', JSON.stringify(this.donglist));
							return
						}
						var arr = res.data.data.list
						if (arr.length > 0) {
							for (let i = 0; i < arr.length; i++) {
								arr[i].endTime = this.formattedEndTime(arr[i].endTime)
							}
						}
						if (arr == []) {
							this.donglist = arr;
							localStorage.setItem('donglist', JSON.stringify(arr));
						} else if (JSON.stringify(arr) !== JSON.stringify(this.donglist)) {
							// 数据有变化，更新页面
							this.donglist = arr;
							localStorage.setItem('donglist', JSON.stringify(arr));
						} else {
							// 数据无变化，不更新页面
						}
					}

				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});


			},
			pddhuidiao() {
				queryPermission().then(res => {
					if (res.data.code == 706) {
						this.showHua = false
						if (uni.getStorageSync('pddJls')) {
							this.showJls = false
						} else {
							this.showJls = true
							this.buzou = 2
						}
					} else if (res.data && res.data.code === 0) {
						console.log(res)
						this.showHua = true
						this.minpdd = true
						if (uni.getStorageSync('pddJls')) {
							this.showJls = false
						} else {
							this.showJls = true
							this.buzou = 1
						}
						// 满足条件,查看用户当前进程
						this.jilubushu()
					}
				}).catch(errors => {});
			},
			// 满足参与资格获取当前信息
			jilubushu() {
				// 用户当前资金
				queryAccountInfo().then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.data)
						var arr = res.data.data
						this.pddAccount = arr[arr.length - 1].account
					}
				}).catch(errors => {
					console.log(errors.message)
				});
				queryUserInfo().then(res => {
					if (res.data && res.data.code === 0) {
						this.queryData = res.data.data
						if (this.queryData.withdrawalStatus == null || this.queryData.withdrawalStatus ==
							'') {
							this.showPdd = true
						} else {
							this.showPdd = false
						}
						// uni.showToast({
						// 	title: '步数：' + res.data.data.step + ',状态：' + res.data.data.taskStatus
						// })
						if (res.data.data.step == 0 && res.data.data.taskStatus == 0) {
							this.chushihua()
						}
					}
				}).catch(errors => {
					if (errors.data.code == 4015) {
						this.chushihua()
					}
				});
				inviteUserList().then(res => {
					if (res.data && res.data.code === 0) {
						this.sumData = res.data.data
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				});
			},
			// 步骤初始化
			chushihua() {
				recordTaskInfo({
					step: 2,
					taskStatus: 1,
					withdrawalType: '',
					inviteUserId: '',
					acvityId: '',
					redpacketId: ''
				}).then(res => {
					if (res.data && res.data.code === 0) {
						this.queryData.step = 1
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				});
			},
			// 判断入口去向
			pddRukou() {
				if (this.queryData.withdrawalStatus == null || this.queryData.withdrawalStatus == '') {
					this.showPdd = true
				} else {
					uni.navigateTo({
						url: '/pages/group_receive_redpacket/redpacket_operate'
					})
				}
			},
			// 拼多多入口去向
			pinduoduo() {
				if (this.queryData.step == 1) {
					// 当第一次参加,需要变更步数
					recordTaskInfo({
						step: 2,
						taskStatus: 1,
						withdrawalType: '',
						withdrawalType: '',
						inviteUserId: '',
						acvityId: '',
						redpacketId: ''
					}).then(res => {
						if (res.data && res.data.code === 0) {
							uni.navigateTo({
								url: '/pages/single_receive_redpacket/market'
							})
						}
					}).catch(errors => {
						this.$refs.uToast.error(errors.data.msg)
					});
				} else if (this.queryData.step == 9 && this.queryData.taskStatus == 0) {
					uni.navigateTo({
						url: '/pages/group_receive_redpacket/redpacket_operate'
					})
				} else if (this.queryData.step >= 8) {
					// 前面小卡拉米都完成了
					uni.navigateTo({
						url: '/pages/group_receive_redpacket/redpacket_more'
					})
				} else {
					uni.navigateTo({
						url: '/pages/single_receive_redpacket/market'
					})
				}
			},
			demo() {
				uni.navigateTo({
					url: '/pages/single_receive_redpacket/demo'
				})
			},
			// 语言切换弹框
			selectClickYy(index) {
				switch (index.name) {
					case '中文简体':
						uni.setStorageSync('i18n', 'zh-CN')
						this._i18n.locale = 'zh-CN'
						this.type = "zh-CN"
						this.$store.dispatch('accRechargeAmount', 'zh-CN');
						break;
					case 'English':
						this._i18n.locale = 'en-US'
						this.type = "en-US"
						uni.setStorageSync('i18n', 'en-US')
						this.$store.dispatch('accRechargeAmount', 'en-US');
						break;
					case 'Русский':
						this._i18n.locale = 'ru-RU'
						this.type = "ru-RU"
						uni.setStorageSync('i18n', 'ru-RU')
						this.$store.dispatch('accRechargeAmount', 'ru-RU');
						break;
					case 'Tagalog':
						this._i18n.locale = 'tl-Ta'
						this.type = "tl-Ta"
						uni.setStorageSync('i18n', 'tl-Ta')
						this.$store.dispatch('accRechargeAmount', 'tl-Ta');
						break;
				}
				// 更改语言
				handleEditUserLanguage().then(res => {}).catch(errors => {});

			},
			// 切换币种回调
			confirm(e) {
				if (e.indexs[0] + 1 == 1) {
					uni.setStorageSync('bzType', 1)
				} else if (e.indexs[0] + 1 == 2) {
					uni.setStorageSync('bzType', 2)
				} else {
					uni.setStorageSync('bzType', 3)
				}
				this.getAccountInfo(e.indexs[0] + 1)
				this.showBz = false
			},
			// 语言弹框关闭
			popupClose() {
				this.popupShow = false
				this.showYy = false
			},
			// 我的页面
			gomy() {
				uni.navigateTo({
					url: '/pages/user/index'
				})
			},
			// 竞猜页面
			goguessing() {
				uni.navigateTo({
					url: '/pages/guessing/index'
				})
			},
			// 开红包
			openGroupRedPacket(e) {
				// back 从哪来返回到哪标志
				if (e.conditionSize > 0) {
					// 从首页过来的
					uni.navigateTo({
						url: `/pages/group_receive_redpacket/share_condition?token=${this.token}&redpacketId=${e.redpacketId}&sort=0&tongji=0&activityId=${e.activityId}&back=''`
					})
				} else if (window.Telegram) {
					handleReqDoSomethingInActivity(1, 'receive_share_redpacket', {
						shareUserId: e.shareUserId,
						redpacketId: e.redpacketId,
						activityId: e.activityId,
						inlineMessageId: '1111'
					}).then(res => {
						let receiveMoney = res.data.data.receiveMoney
						let sort = res.data.data.sort
						this.statisticOk(e.activityId)
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=${receiveMoney}&sort=${sort}&activityId=${e.activityId}&back=''`
						})
					}).catch(errors => {
						this.$refs.uToast.error(errors.message, 3000)
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=0&sort=0&activityId=${e.activityId}&back=''`
						})
					});
				} else {
					handleReqDoSomethingInActivity(1, 'receive_share_redpacket', {
						shareUserId: e.shareUserId,
						redpacketId: e.redpacketId,
						activityId: e.activityId,
						inlineMessageId: '1111'
					}).then(res => {
						let receiveMoney = res.data.data.receiveMoney
						let sort = res.data.data.sort
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=${receiveMoney}&sort=${sort}&activityId=${e.activityId}&back=''`
						})
					}).catch(errors => {
						this.$refs.uToast.error(errors.message, 3000)
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=0&sort=0&activityId=${e.activityId}&back=''`
						})
					});
				}
			},

			// 会员页面跳转
			gomarket() {
				uni.navigateTo({
					url: '/pages/market/index'
				})
			},
			// 收款
			shoukuan() {
				uni.setStorageSync('initiateUrl', 'index')
				uni.navigateTo({
					url: '/pages/index/initiate?type=index'
				})
			},
			// 充值
			chongzhi() {
				uni.navigateTo({
					url: '/pages/charge/index'
				})
			},
			// 关闭抽奖弹框
			guanbi() {
				this.showCj2 = false
				setTimeout(() => {
					this.showCj = false
				}, 500)
			},
			// 菜单
			scrollItemEmitsClick(e) {
				switch (e) {
					case '充值':
						this.$refs.uToast.error(this.i18n.page.text58)
						return
						// 发红包
						this.sendpacket()
						break;
					case '提现':
						// 收款
						this.$refs.uToast.error(this.i18n.page.text58)
						return
						uni.navigateTo({
							url: '/pages/index/initiate'
						})
						break;
					case 'TORN能量':
						// this.$refs.uToast.error(this.i18n.page.text27)
						uni.navigateTo({
							url: '/pages/market/index?type=0'
						})
						break;
					case '飞机会员':
						uni.navigateTo({
							url: '/pages/market/index?type=1'
						})
						break;
				}
			},
			// 资产明细
			zichan() {
				uni.navigateTo({
					url: '/pages/index/assets'
				})
			},
			// 分享好友获得开包机会
			doShareRedpacketShare: function(e) {
				this.debounce.use(() => {
					// 统计分享次数
					this.statisticFx(e.activityId)
					this.$nextTick(() => {
						handleReqDoSomethingInActivity(1, 'share_redpacket_share', {
							activityId: e.activityId,
							redpacketId: e.redpacketId,
							shareUserId: e.shareUserId
						}).then(res => {
							if (res.data && res.data.code === 0) {
								let innerMode = res.data.data.redpacketId + ":" + res
									.data.data
									.activityId + ":" + this.userInfo.userId
								if (window.Telegram) {
									window.Telegram.WebApp.switchInlineQuery(innerMode,
										[
											"users",
											"groups"
										])
								} else {
									this.$refs.uToast.error('请在TG环境操作')
								}
							}
						}).catch(errors => {
							this.$refs.uToast.error(errors.message)
						});
					})
				}, 500);
			},
			// 引导关闭
			yindao() {
				this.showJls = false
				this.buzou = 0
				uni.setStorageSync('pddJls', true)
			},
			// 提现
			tixian() {
				uni.navigateTo({
					url: '/pages/withdrawal/index'
				})
			},
			// 去活动列表页面
			activityList() {
				uni.navigateTo({
					url: '/pages/index/activityList'
				})
			},
			// 关闭弹框
			close() {
				this.showBz = false
				this.showPdd = false
				this.showPdd2 = false
			},
			/**
			 * 获取用户账户详情只调一次
			 */
			getAccountInfo(e) {
				this.$nextTick(() => {
					getAccountInfo(e).then(res => {
						if (res.data && res.data.code === 0) {
							this.accountList = res.data.list || []
							if (this.accountList.length > 0) {
								this.huobiList = this.accountList.map(account => ({
									accountTypeInfo: account.accountTypeInfo,
									exchangeMoney: account.exchangeMoney
								}));
								this.redpacketFrom = this.accountList[0]
								this.redpacketFrom.exchangeMoney = Number(this.redpacketFrom
									.exchangeMoney).toFixed(2)
							}

							this.total_amount = Number(res.data.total_amount).toFixed(2)
							this.assets = res.data
							if (this.assets.exchangeType == 'PHP') {
								uni.setStorageSync('bzType', 2)
							} else if (this.assets.exchangeType == 'INR') {
								uni.setStorageSync('bzType', 3)
							} else {
								uni.setStorageSync('bzType', 1)
							}
							uni.setStorageSync('needShowLoading', false)
							if (this.show2) {
								setTimeout(() => {
									this.show2 = false
									this.showCj = true
								}, 500);
							}


						}
					}).catch(errors => {});
				})
			},
			// 发红包按钮
			sendpacket: function() {
				if (!this.isSetChargePsw) {
					uni.navigateTo({
						url: '/pages/charge_psw/set_index?type=send'
					})
				} else {
					uni.navigateTo({
						url: '/pages/sendpacket/index'
					})
				}
			},
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../static/css/index/index.css';
	@import '../../static/css/index/donghua.css';

	// @import '../../static/css/common.css';
	/* 或者在CSS中使用CSS变量 */
	:root {
		--tg-viewport-height: 100vh;
		--tg-viewport-stable-height: 100vh;
		--tg-safe-area-top: 0px;
		--tg-safe-area-bottom: 0px;
	}

	/deep/ .u-popup__content {
		width: 100%;
	}

	.safe-area-content {
		padding-top: var(--tg-safe-area-top);
		padding-bottom: var(--tg-safe-area-bottom);
	}

	.bg2 {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		width: 100%;
		height: 88rpx;
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/bg2.png');
		background-size: 100% 100%;
		z-index: 200;
	}

	.page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		// overflow: hidden;
		background-color: #f5f1f3 !important;
		position: relative;
	}

	/* 定义关键帧 */
	@keyframes shiftAndShrink {
		0% {
			transform: translateX(0) scale(1);
		}

		25% {
			transform: translateX(-30rpx) scale(1.1);
		}

		50% {
			transform: translateX(-60rpx) scale(0.95);
		}

		75% {
			transform: translateX(-80rpx) scale(1.05);
		}

		100% {
			transform: translateX(-100rpx) scale(1);
		}
	}

	/* 应用动画的类 */
	.animateShiftShrink {
		animation: shiftAndShrink 1s forwards;
		/* 动画持续时间0.5秒，动画完成后保持最后一帧状态 */
	}

	/deep/.u-button--circle {
		margin-top: 0 !important;
	}

	.shine-effect {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to right,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0.3) 50%,
				rgba(255, 255, 255, 0) 100%);
		transform: skewX(-25deg);
		animation: shine 2s infinite;
	}

	@keyframes shine {
		0% {
			left: -100%;
		}

		20%,
		100% {
			left: 200%;
		}
	}

	.shine-wrapper {
		position: relative;
		overflow: hidden;
		/* 确保光效不会溢出容器 */
	}

	.shine-wrapper::before {
		content: '';
		position: absolute;
		top: 0;
		left: -75%;
		width: 50%;
		height: 100%;
		background: linear-gradient(to right,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0.7) 50%,
				rgba(255, 255, 255, 0) 100%);
		transform: skewX(-25deg);
		animation: shine 3s infinite;
		z-index: 10;
		/* 3秒循环一次 */
	}

	@keyframes shine {
		0% {
			left: -75%;
		}

		100% {
			left: 125%;
		}
	}


	.tishen {
		width: 100%;
		height: 200rpx;
		background-color: #fff;
		margin-top: 24rpx;
		border-radius: 20rpx;
	}

	.lottery {
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/lottery.png');
	}

	.lottery2 {
		position: relative;
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/b3b3fd3a-8c64-403c-b92d-e9be21d12d19.png');
		border-radius: 26rpx;
	}

	.lottery,
	.lottery2 {
		overflow: hidden;
		width: 100%;
		height: 200rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.lottery_left {
			text-align: center;
			padding-top: 30rpx;
			// padding-left: 30rpx;
			box-sizing: border-box;
			width: 80%;

			.jiangchi {
				.containerRight {
					margin-left: 20rpx;

					.add {
						image {
							width: 14rpx;
							height: 20rpx;
							margin-right: 12rpx;
						}

						font-family: PingFang SC,
						PingFang SC;
						font-weight: 800;
						font-size: 22rpx;
						color: #FFFFFF;
					}

					.jcdw {
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 22rpx;
						color: #FFFFFF;
					}
				}

				.number-3d {
					font-size: 72rpx;
					font-weight: bold;
					/* 设置背景为线性渐变 */
					background: linear-gradient(180deg, #FFF2CA 0%, #FFAB00 100%);
					/* 使用 -webkit-background-clip: text 来裁剪背景 */
					-webkit-background-clip: text;
					color: transparent;
					// text-shadow: 0 0px 0 #9424b6, 0 5px 0 #888, 0 5px 0 #777, 0 5px 0 #EB5865, 0 5px 0 #555, 0 5px 0 #444, 0 5px 0 #333, 0 5px 3px #bd289c;
					font-style: normal;
					font-family: AlibabaPuHuiTi_3_115_Black;
				}
			}
		}


		.djs {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 28rpx;
			color: #FFFFFF;

			text {
				margin: 0 10rpx;
			}

			.djsson {
				background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/cjdjs.png');
				background-repeat: no-repeat;
				background-size: cover;
				width: 40rpx;
				height: 43rpx;
				margin-right: 6rpx;
			}

			.djsson:last-child {
				margin-right: 0rpx;
			}
		}

		.btn {
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 32rpx;
			color: #533701;
			line-height: 38rpx;
			letter-spacing: 2rpx;
			text-align: center;
		}
	}

	.content-scroll {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		/* 为 iOS 设备提供平滑滚动 */
	}

	/* 针对 iPhone X 及以上机型的底部安全区适配 */
	@supports (padding-bottom: constant(safe-area-inset-bottom)) or (padding-bottom: env(safe-area-inset-bottom)) {
		.tabbar {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
	}

	// ----------------------------------
	.red-packet-list {
		/* 自定义样式 */
	}

	.red-packet-item {
		display: inline-block;
		margin-right: 10px;
		/* 其他样式 */
	}

	// ----------------------------------
	.hide-tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 200rpx;
		/* 根据你的Tabbar高度调整 */
		background-color: #fff;
		/* 覆盖层的颜色，可以是透明或其他颜色 */
		z-index: 999;
		/* 确保覆盖层在其他内容之上 */
	}

	.scroll-view {
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
	}

	.scroll-item {
		display: inline-block;
	}

	button {
		margin-top: 20rpx;
	}

	.warp {
		position: absolute;
		user-select: none;
		/* 防止点击时选中文本 */
		left: 10%;
		right: 10%;
		top: 464rpx;

		.errer {
			text-align: center;
			margin-top: 20rpx;
			opacity: 0.5;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.hezi {
		position: relative;
		width: 100%;

		.leftjt {
			width: 80rpx;
			height: 80rpx;
			top: 140rpx;
			left: 0;
			margin: auto;
			z-index: 999;
			position: absolute;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.rightjt {
			width: 80rpx;
			height: 80rpx;
			top: 140rpx;
			right: 0;
			margin: auto;
			z-index: 999;
			position: absolute;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.zwhd {
		text-align: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		color: #8E8E8E;
	}

	.animated-element {
		color: white;
		animation: fadeUpDown 4s ease-in-out;
	}

	@keyframes fadeUpDown {
		0% {
			opacity: 0;
			transform: translateY(40px) translateX(0%) scale(0.1);
		}

		50% {
			opacity: 1;
			transform: translateY(0) translateX(0%) scale(1);
		}

		100% {
			opacity: 0;
			transform: translateY(-40px) translateX(0%) scale(0.1);
		}
	}

	.hdlist {
		overflow-x: auto;

		.hdson {
			width: 300rpx;
			position: relative;

			.detail {
				width: 60rpx;
				height: 60rpx;
				cursor: pointer;

				image {
					z-index: 999;
					width: 50rpx;
					height: 50rpx;
				}

				color: #fff;
				font-size: 30rpx;
				position: absolute;
				bottom: 110rpx;
				right: 20rpx;
			}



			.hbfm {
				width: 100%;
				height: 364rpx;
				// background-image: url('../../static/images/gifebg.png');
				// background-size: 100% 100%;
				z-index: 10;
				position: relative;

				.verticalCover {
					border-top-right-radius: 20rpx;
					border-top-left-radius: 20rpx;
					border-bottom-left-radius: 10%;
					border-bottom-right-radius: 10%;
				}

				image {
					width: 100%;
					height: 264rpx;
				}

				.gifebgBotton {
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 100%;
					left: 0;
					right: 0;
					margin: auto;
				}




				.open {
					position: absolute;
					width: 160rpx;
					height: 160rpx;
					left: 0;
					right: 0;
					bottom: 16rpx;
					margin: auto;
				}

				.zgden {
					position: absolute;
					width: 155rpx;
					height: 68rpx;
					left: 0;
					right: 0;
					bottom: 70rpx;
					margin: auto;
				}


			}

			.hdmani {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #DA2629;
				text-align: center;
				margin: 10rpx 0;
			}

			.hddate {
				font-size: 24rpx;
				color: #666666;
				text-align: center;
			}
		}

	}



	.rwlist {
		background-color: #fff;
		padding: 25.6rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		margin-top: 10rpx;
		// position: relative;
		// z-index: 110;

		.son {
			padding: 12rpx 0;

			.son_left {
				width: 65%;

				image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
					border-radius: 20rpx;
				}

				.xinxi {
					width: 75%;

					.title {
						font-size: 30rpx;
						font-weight: 700;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.description {
						font-size: 24rpx;
						color: #999;
						margin: 10rpx 0;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.shuju {
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}

						color: #d78b1b;
						font-weight: 600;
						font-size: 32rpx;
					}
				}

			}

			.son_right {
				box-shadow: 0 10rpx 15rpx -8rpx #ff563399;
				font-weight: 600;
				padding: 14rpx 0rpx;
				box-sizing: border-box;
				background: linear-gradient(360deg, #ff5656, #ffac53);
				border-color: #ffac53;
				color: #fff;
				border-radius: 50rpx;
				font-size: 24rpx;
				width: 150rpx;
				cursor: pointer;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 5rpx;
				}
			}

			.son_right2 {
				box-shadow: 0 10rpx 15rpx -8rpx #ff563399;
				font-weight: 600;
				padding: 14rpx 0rpx;
				box-sizing: border-box;
				background: linear-gradient(360deg, #FFAB00, #FFF2CA);
				border-color: #ffac53;
				color: #69400acc;
				border-radius: 50rpx;
				font-size: 24rpx;
				width: 150rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 5rpx;
				}
			}
		}
	}

	.title2 {
		font-weight: 600;
		font-size: 32rpx;
		color: #333333;
		margin-bottom: 20rpx;
		height: 44rpx;

		.gengduo {
			font-size: 24rpx;
			color: #8E8E8E;
		}

		.bian {
			width: 8rpx;
			height: 28rpx;
			background-color: #FC575F;
			border-radius: 4rpx;
			margin-right: 10rpx;
		}
	}



	.gonggao {
		margin: 30rpx 0;
	}

	/deep/.u-notice-bar {
		width: 100%;
		background: linear-gradient(90deg, rgba(252, 87, 95, 0) 0%, #fc575f2e, rgba(252, 87, 95, 0) 100%);

		.u-notice__content__text {
			font-weight: 600 !important;
		}
	}

	.loading {
		text-align: center;
		padding: 15px;
	}

	.no-more {
		text-align: center;
		color: #888;
		padding: 15px;
	}

	.box {
		// position: absolute;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		overflow-y: auto;
		background-color: #f5f1f3;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			width: 100%;
			height: 348rpx;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/homebg.png');
			background-size: 100% 100%;
			z-index: 10;
		}


		.header {
			margin-bottom: 20rpx;
			position: relative;
			z-index: 90;

			.head_left {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 36rpx;
				color: #FFFFFF;
				cursor: pointer;

				.avatar {
					display: inline-flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-weight: 700;
					background-color: #fff;
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}
			}

			.yuyan {
				width: 52rpx;
				height: 52rpx;
				background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/yuyan.png');
				background-size: 100% 100%;
				color: #fff;
				font-weight: 600;
				position: relative;
				z-index: 112;

				.yytext {
					margin: 10rpx 0 0 10rpx;
				}
			}

			.yuyan2 {
				width: 57rpx;
				height: 50rpx;
			}
		}

		.kuang {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 30rpx;
			box-sizing: border-box;
			position: relative;
			z-index: 100;

			.btns {
				.btn_right {
					.liwu {
						background-color: #FAF7F8;
						border-radius: 20rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 20rpx;
						color: #FC575F;
						padding: 2rpx 10rpx 2rpx 0;
						box-sizing: border-box;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 10rpx;
						}
					}

					.pl {
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 24rpx;
						color: #8E8E8E;
						margin: 0 18rpx 0 30rpx;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 10rpx;
						}
					}

					.shoucang {
						width: 36rpx;
						height: 36rpx;
					}
				}

				.btn_left {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 24rpx;
					color: #8E8E8E;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}
			}

			.gailv {
				.bfb {
					font-weight: 600;
					font-size: 24rpx;
					color: #4A85FF;
					margin-bottom: 10rpx;
				}

				text-align: center;
				font-weight: 600;
				font-size: 24rpx;
				color: #8E8E8E;
				margin-top: -80rpx;
			}

			.wenti {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #333333;

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}
			}

			.topxx {
				height: 40rpx;
				margin-top: 18rpx;
			}

			.xx_left {
				.title {
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
				}

				.time {
					font-size: 24rpx;
					color: #8E8E8E;
					margin: 0 10rpx 0 20rpx;
				}

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}

			.xx_right {
				font-size: 24rpx;
				color: #8E8E8E;
				font-weight: 600;

				image {
					width: 12rpx;
					height: 20rpx;
					margin-left: 8rpx;
				}
			}

			.cenxx {
				margin: 40rpx 0 0;
				cursor: pointer;

				/deep/.u-icon__img {
					width: 22rpx !important;
					height: 28rpx !important;
					margin-right: 10rpx !important;
				}

				.btnicon {
					width: 110rpx;

					image {
						width: 42rpx;
						height: 42rpx;
						margin-bottom: 7rpx;
					}

					text-align: center;
					font-size: 24rpx;
					color: #333333;
				}

				.dengyu {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 30rpx;
					color: #333333;
				}

				.shu {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 56rpx;
					color: #333333;
					margin-left: 10rpx;
				}

				.danwei {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 30rpx;
					color: #333333;
					margin: 0 10rpx 0 20rpx;
				}

				image {
					width: 28rpx;
					height: 16rpx;
				}
			}
		}
	}

	.logo-container {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		left: 0;
		display: flex;
		justify-content: center;
		height: 100vh;
		background-color: #fff;
		z-index: 999;
		/* 使用视口高度单位 */
	}

	.logo {
		margin-top: 200rpx;
		width: 248rpx;
		height: 320rpx;
		// animation: fadeInScaleOut 1s ease-in-out forwards;
		animation: fadeInScaleIn 1s ease-in-out forwards;
	}

	@keyframes fadeInScaleIn {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}

		50% {
			opacity: 1;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1);
		}
	}

	.popupShow {
		text-align: center;
		width: 700rpx;
		min-height: 900rpx;
		padding: 60rpx 20rpx 20rpx;
	}

	.text-wrapper_3 {
		margin-top: 70px;
	}

	.box_1 {
		border: 1px solid #0350FF;
	}

	.box_1 {
		background-color: #0350FF;

		span {
			color: #fff;
		}
	}

	.box_2 {
		border-radius: 23px;
		border: 1px solid rgba(51, 51, 51, 1);
		padding: 15rpx 80rpx;
		margin-left: 15px;
		color: rgba(51, 51, 51, 1);

		::v-deep .uicon-arrow-downward {
			color: rgba(51, 51, 51, 1) !important;
		}
	}

	.box_2:hover {
		background-color: rgba(3, 80, 255, 1);
		border-radius: 23px;
		color: rgba(255, 255, 255, 1);
		border: 1px solid rgba(51, 51, 51, 1);
		padding: 15rpx 80rpx;
		margin-left: 15px;

		::v-deep .uicon-arrow-downward {
			color: rgba(255, 255, 255, 1) !important;
		}
	}


	.box1 {
		text-align: center;
		color: #fff;

		image {
			width: 700rpx;
			height: 570rpx;
		}

		.btn {
			width: 80%;
			margin: 0 auto;
		}

		.renwu {
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/renwu.png');
			background-size: cover;
			width: 100%;
			height: 556rpx;
			position: relative;
			padding-top: 150rpx;

			.title {
				font-weight: 700;
				font-size: 48rpx;
				color: #FFF4CC;

				.gl {
					background: -webkit-linear-gradient(top, #EAE04E, #F9C93F);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.kuangnei {
				position: absolute;
				bottom: 80rpx;
				left: 0;
				right: 0;
				font-weight: 700;
				font-size: 44rpx;
				color: #DD3B26;

				.maxtitle {
					font-size: 48rpx;
					color: #412416;
					margin-bottom: 14rpx;
				}
			}
		}
	}

	.pddrk {
		position: fixed;
		bottom: 100rpx;
		right: 10rpx;
		width: 200rpx;
		height: 190rpx;
	}

	.yiwz {
		position: fixed;

		.son_right {
			box-shadow: 0 10rpx 15rpx -8rpx #00063399;
			font-weight: 600;
			padding: 10rpx 0rpx;
			box-sizing: border-box;
			background: linear-gradient(360deg, #0099ff, #009aff);
			border-color: #ffac53;
			color: #fff;
			border-radius: 10rpx;
			font-size: 24rpx;
			width: 150rpx;
			text-align: center;
			cursor: pointer;
			margin-top: 10rpx;
		}
	}

	// 气泡
	.pop {
		position: fixed;
		bottom: 0rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		color: #000;
		border-radius: 10rpx;
		font-size: 24rpx;
		// animation: breathing 2s ease-in-out infinite;
		width: 230rpx;
		text-align: center;

		.text {
			margin: 0 20rpx;
		}
	}

	// 气泡指针
	.pop::after {
		content: "";
		width: 0;
		height: 0;
		border: 10px solid;
		border-color: transparent transparent transparent #fff; //上左下右
		position: absolute;
		top: 50%;
		right: -30rpx;
		/* 减去一半的边框宽度，使箭头中心对齐 */
		transform: translateY(-50%);
		/* 使箭头垂直居中 */
	}

	.pop2 {
		position: fixed;
		bottom: 0rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		color: #000;
		border-radius: 10rpx;
		font-size: 24rpx;
		// animation: breathing 2s ease-in-out infinite;
		width: 300rpx;
		text-align: center;
		margin-top: 10rpx;

		.text {
			margin: 0 20rpx;
		}
	}

	.pop2::after {
		content: "";
		width: 0;
		height: 0;
		border: 10px solid;
		border-color: transparent transparent #fff transparent; //上左下右
		position: absolute;
		bottom: 90rpx;
		/* 将箭头定位在目标元素的下方 */
		left: 50%;
		/* 将箭头的水平中心对齐到目标元素的中心 */
		/* 减去一半的边框宽度，使箭头中心对齐 */
		transform: translateX(-50%);
	}

	.pop3 {
		position: fixed;
		bottom: 0rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		color: #000;
		border-radius: 10rpx;
		font-size: 24rpx;
		// animation: breathing 2s ease-in-out infinite;
		width: 400rpx;
		text-align: center;
		margin-top: 10rpx;

		.text {
			margin: 0 20rpx;
		}
	}

	.pop3::after {
		content: "";
		width: 0;
		height: 0;
		border: 10px solid;
		border-color: #fff transparent transparent transparent; //上左下右
		position: absolute;
		bottom: -30rpx;
		/* 将箭头定位在目标元素的下方 */
		left: 50%;
		/* 将箭头的水平中心对齐到目标元素的中心 */
		/* 减去一半的边框宽度，使箭头中心对齐 */
		transform: translateX(-50%);
	}

	.weizhi {
		width: 250rpx;
		position: absolute;
		right: 80rpx;
		top: -18rpx;
		margin: auto;
		cursor: pointer;


		.pddAccount {
			width: 100%;
			font-size: 30rpx;
			font-weight: bold;
			background: linear-gradient(180deg, #FFF2CA 0%, #FFAB00 100%);
			-webkit-background-clip: text;
			color: transparent;
			font-style: normal;
			// color: #fff;
			position: absolute;
			text-align: center;
			margin-top: -20rpx;

		}



		@keyframes breathing {

			50%,
			100% {
				transform: scale(1);
				/* 原始大小 */
			}


			50% {
				transform: scale(1.1);
				opacity: 0;
				/* 放大到原始大小的110% */
			}
		}
	}

	.parachute {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		top: -100rpx;
		/* left: 60rpx; */
		opacity: 0;
		z-index: 999;
		cursor: pointer;
	}

	.start-drop {
		animation: dropAndSwing 5s ease-in-out forwards;
	}

	@keyframes dropAndSwing {
		0% {
			opacity: 1;
			transform: translate(0, 0) rotate(0deg);
		}

		/* 		20% {
				transform: translate(20vw, 20vh) rotate(-15deg);
			}
	
			40% {
				transform: translate(40vw, 45vh) rotate(10deg);
			}
	
			60% {
				transform: translate(60vw, 65vh) rotate(-10deg);
			} */

		70% {
			opacity: 1;
			transform: translate(75vw, 80vh) rotate(5deg);
		}

		100% {
			opacity: 0;
			transform: translate(85vw, 90vh) rotate(0deg);
		}
	}
</style>