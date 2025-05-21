<template>
	<view class="gambling">
		<block>
			<!-- <image src="../../static/images/redpacket_more/del.png" class="cjdel" @click="del" mode=""></image> -->
			<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/lotterylogo.png" class="lotterylogo"
				mode="aspectFill">
			</image>
			<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/group.png" class="group"
				mode="aspectFill"></image>
			<view class="jiangchi fl_cen animation-container">
				<view class="container">
					<!-- <text class="number-3d">{{totalAmount}}</text> -->
					<countup :num="totalAmount" color="" width='35' height='70'></countup>
				</view>
				<view class="containerRight containe">
					<view class="fl_al add  animated-element" v-if="chazhi != 0">
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
			<!-- 	<view v-for="(item, index) in items" :key="index" :style="item.style"
					:class="['popup-item', item.active ? 'active' : '']">
					+5↑
				</view> -->
			<view class="djs">
				<view class="titles fl_ju">
					<text>HRS</text>
					<text>MIN</text>
					<text>SEC</text>
				</view>

				<view class="time2 fl_cen" v-if="allTime == 0">
					{{formatTime}}
				</view>
				<view class="time fl_ju" v-else>
					<text>{{timeDiff.hours}}</text>
					<text>:</text>
					<text>{{timeDiff.minutes}}</text>
					<text>:</text>
					<text>{{timeDiff.seconds}}</text>
				</view>
			</view>
			<view class="jieti">
				<view class="" style="display: flex;justify-content: space-between;">
					<view class="jieson" style="padding-left: 20rpx;">
						<view class="" style="position: absolute;bottom: 18rpx;">
							<view class="er" style="cursor: pointer;" @click="paiming('last')">
								<view class="er2" v-if="lastList.length > 0">
									<view class="tx1 fl_cen" :style="{ background: gradient }">
										{{lastlist1.nickName[0]}}
									</view>
								</view>
								<view class="tx11 fl_cen" :style="{ background: gradient }" v-if="lastList.length > 1">
									{{lastlist2.nickName[0]}}
								</view>
								<view class="tx12 fl_cen" :style="{ background: gradient }" v-if="lastList.length > 2">
									{{lastlist3.nickName[0]}}
								</view>
							</view>
							<view class="title" style="cursor: pointer;" @click="paiming('last')">
								{{i18n.gambling.top2}}
							</view>
							<view class="tishi fl_cen">
								{{i18n.gambling.title1}}
								<view class="baifen">
									35%
								</view>
							</view>
							<view class="jiangli fl_cen">
								<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/usdt.png"
									mode="">
								</image>
								{{(totalAmount * 0.35).toFixed(3)}}
							</view>
						</view>
					</view>
					<view class="jieson">
						<view class="diyi" @click="paiming('lucky')">
							<view class="diyison">
								<view class="tx1 fl_cen" v-if="luckyPerson" :style="{ background: gradient }">
									{{luckyPerson.nickName[0]}}
								</view>
								<image
									src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/wenhao2.png"
									v-else class="tx1" mode="">
								</image>
							</view>
						</view>
						<view class="title" @click="paiming('lucky')"
							style="cursor: pointer;background: linear-gradient( 94deg, #FFA22E 0%, #FC9005 100%);">
							{{i18n.gambling.top1}}
						</view>
						<view class="tishi fl_cen">
							{{i18n.gambling.title1}}
							<view class="baifen">
								45%
							</view>
						</view>
						<view class="jiangli fl_cen" style="margin-bottom: 50rpx;">
							<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/usdt.png" mode="">
							</image>
							{{(totalAmount * 0.45).toFixed(3)}}
						</view>
					</view>
					<view class="jieson">
						<view class="" style="position: absolute;bottom: 18rpx;right: 4rpx;">
							<view class="er" style="cursor: pointer;" @click="paiming('top')">
								<view class="er2" v-if="topList.length > 0">
									<view class="tx1 fl_cen" :style="{ background: gradient }">
										{{toplist1.nickName[0]}}
									</view>
								</view>
								<view class="tx11 fl_cen" :style="{ background: gradient }" v-if="topList.length > 1">
									{{toplist2.nickName[0]}}
								</view>
								<view class="tx12 fl_cen" :style="{ background: gradient }" v-if="topList.length > 2">
									{{toplist3.nickName[0]}}
								</view>
							</view>
							<view class="title" style="cursor: pointer;" @click="paiming('top')">
								{{i18n.gambling.top3}}
							</view>
							<view class="tishi fl_cen">
								{{i18n.gambling.title1}}
								<view class="baifen">
									20%
								</view>
							</view>
							<view class="jiangli fl_cen">
								<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/usdt.png"
									mode="">
								</image>
								{{(totalAmount * 0.2).toFixed(3)}}
							</view>
						</view>
					</view>
				</view>

				<!-- 				<view class="btn" @click="mianfei"
					:style="allTime == 0 ?'background:#F5F5F5;color:#333333;':'background: linear-gradient(180deg, #FFF2CA 0%, #FFAB00 100%);'">
					{{allTime == 0?i18n.page.text64:i18n.gambling.btn}}
				</view> -->

				<view class="caidan fl_ju">
					<view class="cdson fl_al" @click="jiangquan">
						<image
							src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/icon.png"
							mode=""></image>
						{{i18n.gambling.tab1}}({{jqListsum}})
					</view>
					<view class="xian">

					</view>
					<view class="cdson fl_al" @click="pingdao">
						<image
							src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/icon2.png"
							mode=""></image>
						{{i18n.gambling.tab2}}
					</view>
				</view>
			</view>
			<view class="tab_list">
				<view class="titlemax">
					{{i18n.page.text65}}
				</view>
				<view class="title fl_cen" v-if="advertiserInfo.length > 0">
					{{i18n.gambling.huodong.title3}}
				</view>

				<view class="tankuang" v-if="advertiserInfo.length > 0">
					<hr-grid-swiper :grid-data="advertiserInfo" :columns="1" :rows="1">
						<template #default="{ item, gridWidth, gridHeight }">
							<view class="guanggao fl_ju">
								<view class="fl_al">
									<image src="https://bf2055756e.node.openad.network/static/images/logo/logo.svg"
										class="zzftx" mode="aspectFill"></image>
									<view class="xinxi">
										{{i18n.gambling.huodong.name}}
										<!-- 		<view class="miaoshu">
											{{item.advertiserDescription}}
										</view> -->
									</view>
								</view>
								<view class="chakan2 fl_al" v-if="item.currentUserRecieveCount > 0">
									{{i18n.gambling.buzou.btn2}}
								</view>
								<!-- 		@click="onClick_go(item)"
								v-else -->
								<view>
									<OpenADAdvertisement :zoneId="286" :publisherId="325" @adClick="adClick"
										:sendLotteryCount="item.sendLotteryCount" :userInfo="userInfo"
										:appVersion="'1.0.1'" @adTaskFinished="handleAdTaskFinished"
										@adClosed="handleAdClosed" />
								</view>
							</view>
						</template>
					</hr-grid-swiper>
				</view>
				<view class="title fl_cen">
					{{i18n.gambling.huodong.title2}}
				</view>
				<view class="rwlist">
					<view class="son fl_ju" v-for="(item,index) in donglist" :key="item.activityId"
						@click="hdSend(item)">
						<view class="son_left fl_al">
							<image :src="item.avatar" class="avatar" v-if="item.avatar" mode=""></image>
							<image
								src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/avatar.png"
								v-else mode="" class="avatar"></image>
							<view class="xinxi">
								<view class="titlehd">
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
									<!-- 				<view class="fl_al" v-if="!item.canRecieve">
										<text style="margin: 0 20rpx;">+</text>
										<view class="" style="position: relative;">
											<view class="shine-wrapper2 fl_cen">
												<image
													src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/Vector.png"
													mode=""></image>
											</view>
										</view>
									</view> -->

								</view>
							</view>
						</view>
						<view class="son_right fl_cen" v-if="item.canRecieve">
							{{i18n.home.btn3}}
							<image
								src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/right2.png"
								mode=""></image>
						</view>
						<view class="" v-else>
							<view class="fl_end">
								<view class="son_right2 fl_cen" @click.stop="doShareRedpacketShare(item)">
									<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/ticket.png"
										style="width: 44rpx;height: 40rpx;margin-left: 10rpx;" mode="aspectFit"></image>
									<view class="" style="margin-top: 5rpx;margin-left: 5rpx;">
										+ 3
									</view>
								</view>
							</view>
							<view class="copy" @click.stop="urlCopy(item)">
								{{i18n.sendpacketSend.btn1}}
							</view>
						</view>

					</view>
				</view>
			</view>

			<!-- 			<view class="user_list">
				<view class="tabs fl_jue">
					<view :class="showTab==0?'tabson fl_cen showthis':'tabson fl_cen'" @click="showTab = 0">
						{{i18n.gambling.tab3}}
					</view>
					<view :class="showTab==1?'tabson fl_cen showthis':'tabson fl_cen'" @click="showTab = 1">
						{{i18n.gambling.tab4}}
					</view>
				</view>
			</view> -->
			<view class="tab_list">
				<view class="titlemax">
					{{i18n.gambling.guize.title}}
				</view>
				<view class="title fl_cen">
					{{i18n.gambling.guize.name1}}
				</view>
				<view class="txt">
					1.{{i18n.gambling.guize.text1}}
				</view>
				<view class="txt">
					2.{{i18n.gambling.guize.text11}}
				</view>
				<view class="title fl_cen">
					{{i18n.gambling.guize.name2}}
				</view>
				<view class="txt">
					{{i18n.gambling.guize.text21}} {{detail.initAmount}} USDT
					<br />
					{{i18n.gambling.guize.text22}} + {{detail.everyPersonIncreaseAmount}} USDT
					<br />
					{{i18n.gambling.guize.text23}}
				</view>
				<view class="title fl_cen">
					{{i18n.gambling.guize.name3}}
				</view>
				<view class="txt">
					{{i18n.gambling.guize.text3}}
					<view class="" style="margin-top: 20rpx;">
						{{i18n.gambling.guize.name31}}：
					</view>
					<view class="panding">
						<view class="name fl_al">
							<text>■</text>{{i18n.gambling.guize.text31}}
						</view>
						<view class="suanshu fl_al" style="margin-bottom: 47rpx;">
							66,888.88 × 3,333.33 × 3.33 = 741,582,
							<view class="jieguo">
								339.678754
							</view>
							<image
								src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/gou.png"
								mode=""></image>
						</view>
						<view class="name fl_al">
							<text>■</text>{{i18n.gambling.guize.text32}}
						</view>
						<view class="suanshu fl_al">
							66,888.88 × 3,333.33 × 3.33 = 741,582,
							<view class="jieguo">
								339.678754
							</view>
						</view>
						<view class="suanshu fl_al" style="color: #F6F2F3;">
							66,888.88 × 3,333.33 × 3.33 = 741,582,
							<view class="jieguo2">
								<image
									src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/jiantou.png"
									mode=""></image>
							</view>
						</view>
						<view class="suanshu fl_al" style="color: #F6F2F3;">
							66,888.88 × 3,333.33 × 3.33 = 741,582,
							<view class="jieguo">
								339.678753
							</view>
							<image
								src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/gou.png"
								mode=""></image>
						</view>
					</view>
				</view>
				<view class="title fl_cen">
					{{i18n.gambling.guize.name4}}
				</view>
				<view class="txt">
					{{i18n.gambling.top1}}{{i18n.gambling.guize.text41}}
					<br />
					{{i18n.gambling.top2}}{{i18n.gambling.guize.text42}}
					<br />
					{{i18n.gambling.top3}}{{i18n.gambling.guize.text43}}
				</view>
				<view class="title fl_cen">
					{{i18n.gambling.guize.name5}}
				</view>
				<view class="txt">
					1.{{i18n.gambling.guize.text51}}
					<br />
					2.{{i18n.gambling.guize.text52}}
				</view>
			</view>
			<view class="tab_list">
				<view class="titlemax">
					{{i18n.gambling.mianze.title}}
				</view>
				<view class="txt" style="margin-top: 36rpx;">
					{{i18n.gambling.mianze.text1}}
				</view>
				<view class="txt" style="margin-top: 36rpx;">
					{{i18n.gambling.mianze.text2}}
				</view>
				<view class="txt" style="margin-top: 36rpx;">
					{{i18n.gambling.mianze.text3}}
				</view>
				<view class="txt" style="margin-top: 36rpx;">
					{{i18n.gambling.mianze.text4}}
				</view>
			</view>
		</block>
		<view class="" style="">

		</view>
		<u-popup :show="show" bgColor="transparent" :safeAreaInsetBottom="false" :round="18" closeIconPos='top-left'
			closeable mode="bottom" @close="close">
			<view class="tankuang">
				<view class="litizi">
					<text class="glowing-text">{{i18n.gambling.youhua.fsname1}}</text>
					<view class="">
					</view>
					<text class="glowing-text yellow-text">{{i18n.gambling.youhua.shuoming1}} </text>
					<view class="">
					</view>
					<!-- <text class="glowing-text yellow-text">lottery tickets</text> -->
				</view>
				<view class="follow">
					{{i18n.gambling.youhua.tishi}}
				</view>
				<block v-if="advertiserInfo.length > 0">
					<hr-grid-swiper :grid-data="advertiserInfo" :columns="1" :rows="1">
						<template #default="{ item, gridWidth, gridHeight }">
							<view class="guanggao fl_ju">
								<view class="fl_al">
									<image :src="item.advertiserCover" mode="aspectFill"></image>
									<view class="xinxi">
										<view class="name">
											{{item.advertiserName}}
										</view>
										<view class="miaoshu">
											{{item.advertiserDescription}}
										</view>
									</view>
								</view>
								<view class="chakan2 fl_al" v-if="item.currentUserRecieveCount > 0">
									{{i18n.gambling.buzou.btn2}}
								</view>
								<view class="chakan fl_al" @click="onClick_go(item)" v-else>
									<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/ticket.png"
										style="width: 44rpx;height: 40rpx;margin-left: 10rpx;" mode=""></image>
									<view class="" style="margin-top: 5rpx;margin-left: 5rpx;">
										+{{item.sendLotteryCount}}
									</view>
								</view>
							</view>
						</template>
					</hr-grid-swiper>

				</block>
				<!-- 				<view class="fsname">
					
				</view> -->
				<view class="litizi">
					<text class="glowing-text">{{i18n.gambling.youhua.fsname2}}</text>
					<view class="">
					</view>
					<text class="glowing-text yellow-text">{{i18n.gambling.youhua.shuoming2}}</text>
					<view class="">
					</view>
					<!-- <text class="glowing-text yellow-text">receiveunlimited lottery tickets</text> -->
				</view>
				<view class="buzou fl_ju">
					<view class="bzson">
						<view class="">
							{{i18n.gambling.youhua.buzou.text1}}
						</view>
						{{i18n.gambling.youhua.buzou.text11}}
					</view>
					<image
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/right2.png"
						mode=""></image>
					<view class="bzson">
						<view class="">
							{{i18n.gambling.youhua.buzou.text2}}
						</view>
						{{i18n.gambling.youhua.buzou.text22}}
					</view>
					<image
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/right2.png"
						mode=""></image>
					<view class="bzson">
						<view class="">
							{{i18n.gambling.youhua.buzou.text3}}
						</view>
						{{i18n.gambling.youhua.buzou.text33}}
					</view>
				</view>
				<view class="baidi">
					<view class="koulin fl_cen">
						{{i18n.gambling.youhua.title}}
						<image
							src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/wenhao.png"
							@click="clickJc" mode=""></image>
					</view>
					<view class="klcode">
						<view class="code">
							{{code}}
						</view>
						<view class="fuzhi" @click="codeKl(code)">
							<image
								src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/fuzhi.png"
								mode=""></image>
						</view>
					</view>
				</view>

				<u-line></u-line>
				<view class="fl_ju btnbox">
					<view class="btnmax1" @click="copyText">
						{{i18n.redpacketDetail.btn2}}
					</view>
					<view class="btnmax" @click="share">
						{{i18n.gambling.btn3}}
					</view>
				</view>

			</view>
		</u-popup>
		<!-- 抽奖券列表 -->
		<u-popup mode="center" round="10" :show="accountListShow" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
		          height: '500px',
				  overflowY: 'auto',
		        }" @close="accountList_close">
			<view class="u-popup-slot">
				<view class="accountlist_group_2 flex-col">
					<span class="accountlist_text">{{i18n.gambling.tab1}}</span>
				</view>
				<u-empty iconSize="200rpx" v-if="jqListsum === 0" mode="list" icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/zwxx.png"
					:text="i18n.gambling.text1">
				</u-empty>
				<view class="zongshu" v-else>
					{{i18n.gambling.current}}：{{jqListsum}}
				</view>
				<scroll-view scroll-y :style="{ height: '60vh' }" @scrolltolower="onScrollToLower">
					<!-- 弹框内容 -->
					<u-list>
						<u-list-item v-for="(item, index) in jqList" :key="index">
							<u-cell size="large">
								<view class="list_title" slot="title">{{item}}</view>
								<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/ticket.png"
									style="margin-right: 10rpx;width: 44rpx;height: 40rpx;" slot="icon" mode=""></image>
							</u-cell>
						</u-list-item>
					</u-list>
					<u-loadmore :status="status" v-if="jqListsum>10" />
				</scroll-view>

			</view>
		</u-popup>
		<!-- 中奖人员名单 -->
		<u-popup mode="center" round="10" :show="show10" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
		          height: '500px',
				  overflowY: 'auto',
				  paddingBottom: '20rpx'
		        }" @close="accountList_close">
			<view class="u-popup-slot">
				<view class="accountlist_group_2 flex-col">
					<span class="accountlist_text">{{title}}</span>
				</view>
				<u-empty iconSize="200rpx" v-if="gglist.length === 0" mode="list" icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/zwxx.png"
					:text="i18n.page.text56">
				</u-empty>
				<u-list style="padding-bottom: 20rpx;" v-if="title == i18n.gambling.name">
					<u-list-item v-for="(item, index) in gglist" :key="index">
						<u-cell :title="i18n.gambling.last.last1+' : '+item.nickName" v-if="index == 0"
							:label="i18n.gambling.time+' : '+item.createTime" center>
						</u-cell>
						<u-cell size="large" v-else>
							<view class="fl_wl" slot="title" style="color: #999;">
								<view class="" style="margin-bottom: 10rpx;">
									{{i18n.gambling.last.last2+' ' + Number(index+1) +' ' + i18n.gambling.last.digits+' : '+item.nickName}}
								</view>
								<view class="">
									{{i18n.gambling.time+' : '+item.createTime}}
								</view>
							</view>
						</u-cell>
						<!-- 		<u-cell
							:title="i18n.gambling.last.last2+' ' + Number(index+1) +' ' + i18n.gambling.last.digits+' : '+item.nickName"
							 :label="i18n.gambling.time+' : '+item.createTime" center >
						</u-cell> -->
					</u-list-item>
				</u-list>
				<block v-else-if="title == i18n.gambling.top1">
					<!-- <view class="list_title">{{luckyPerson.nickName}}</view> -->
					<u-list style="padding-bottom: 20rpx;">
						<u-list-item v-for="(item, index) in gglist" :key="index">
							<!-- 	<u-cell :title="item.nickName"  center>
								</u-cell> -->
							<u-cell size="large">
								<view class="fl_wl" slot="title">
									<view class="list_title" style="margin-right: 10rpx;">
										{{i18n.gambling.xingyun.user}}：{{detail.luckyPerson.nickName}}
									</view>

									<view class="list_title fl_al">
										{{i18n.gambling.xingyun.code}}：
										<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/ticket.png"
											style="margin:0 10rpx;width: 44rpx;height: 40rpx;" mode="">
										</image>
										{{detail.luckyPerson.lotteryCode}}
									</view>
								</view>
							</u-cell>
						</u-list-item>
					</u-list>
					<block v-if="detail.luckyPerson">
						<view class="zhongjiang">
							{{i18n.gambling.xingyun.title}}：{{detail.luckyPerson.lotteryResult}}
						</view>
						<view class="fl_ju zhucheng">
							<view class="zcson">
								<text style="margin-right: 10rpx;">BTC : </text> {{detail.luckyPerson.btcPrice || '--'}}
							</view>
							<view class="zcson">
								<text style="margin-right: 10rpx;">ETH : </text> {{detail.luckyPerson.ethPrice || '--'}}
							</view>
							<view class="zcson">
								<text style="margin-right: 10rpx;">TON :</text> {{detail.luckyPerson.tonPrice || '--'}}
							</view>
						</view>
					</block>

				</block>
				<u-list style="padding-bottom: 20rpx;" v-else>
					<u-list-item v-for="(item, index) in gglist" :key="index">
						<u-cell :title="i18n.gambling.rankingItem.item1+' : '+item.nickName" v-if="index == 0"
							:label="i18n.gambling.name2+':'+item.shareCount" center>
						</u-cell>
						<u-cell :title="i18n.gambling.rankingItem.item2+' : '+item.nickName" v-else-if="index == 1"
							:label="i18n.gambling.name2+':'+item.shareCount" center>
						</u-cell>
						<u-cell :title="i18n.gambling.rankingItem.item3+' : '+item.nickName" v-else-if="index == 2"
							:label="i18n.gambling.name2+':'+item.shareCount" center>
						</u-cell>
						<u-cell
							:title="i18n.gambling.rankingItem.item4+Number(index+1)+i18n.gambling.rankingItem.item5+' : '+item.nickName"
							v-else :label="i18n.gambling.name2+':'+item.shareCount" center>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
		</u-popup>
		<!-- 再次提示框 -->
		<u-popup mode="center" round="10" :show="showTs" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
				  paddingBottom:'30rpx',
				  boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 11%)'
		        }" @close="showTs = false">
			<view class="u-popup-slot">
				<view class="accountlist_group_2 flex-col">
					<span class="yindao">{{i18n.gambling.tishikuang.tishi}}</span>
				</view>
				<view class="tishitu">
					<image
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/tishi.png"
						mode="aspectFit"></image>
				</view>
				<view class="gouxuan fl_cen">
					<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
						<u-checkbox labelSize="12" v-for="(item, index) in checkboxList1" :key="index"
							:label="i18n.gambling.tishikuang.gouxuan" activeColor="#ff505d"
							:name="i18n.gambling.tishikuang.gouxuan">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="liaojie" @click="neilian">
					{{i18n.gambling.tishikuang.btn}}
				</view>
			</view>
		</u-popup>
		<!-- 口令步骤弹框 -->
		<u-popup mode="center" round="10" :show="showJc" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
				  paddingBottom:'30rpx',
				  boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 11%)'
		        }" @close="showJc = false">
			<view class="u-popup-slot">
				<view class="accountlist_group_2 flex-col">
					<span class="yindao"> {{i18n.gambling.kouling.tet1}}</span>
					<span class="yindao">{{i18n.gambling.kouling.tet2}}</span>
					<span class="yindao"> {{i18n.gambling.kouling.tet3}}</span>
				</view>
				<!-- 		<view class="liaojie" @click="neilian">
					{{i18n.gambling.tishikuang.btn}}
				</view> -->
			</view>
		</u-popup>
		<u-modal :show="showCopy" :title="i18n.gambling.copyTk.title" @confirm="confirm"
			:confirmText="i18n.gambling.copyTk.btn" :content='i18n.gambling.copyTk.text'></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getLotteryRedpackage,
		getGroupRedPacket,
		redpCopyActivityLink,
		queryLotteryCountdown,
		queryLotteryCodeByTgId,
		lotteryShareInfo,
		lotteryAdvertiserInfo,
		getActivityCodeTranslation,
		openBotOrMiniapp,
		insertChannel,
		insertGroup,
		redpacketQueryActivityByPage,
		statisticsInterface,
		insertOpenAd
	} from '@/api/group_receive_redpacket.js';
	import {
		setGroupRedpacketIdLocal,
		removeShareActivityIdLocal,
		removeGroupRedpacketIdLocal,
		setShareActivityIdLocal,
		removeShareUserIdLocal,
		setShareUserIdLocal
	} from "@/utils/localData.js";
	import {
		antwalletbotCopy,
	} from "@/utils/util.js";
	import {
		getUserInfo,
		getUserInfoAvatar
	} from '@/api/index.js';
	import {
		handleReqDoSomethingInActivity
	} from '@/api/single_receive_redpacket.js';
	import {
		addSeconds,
		format
	} from 'date-fns';
	import liuProgressbar from '@/uni_modules/liu-progressbar/components/liu-progressbar/liu-progressbar.vue'
	import hrGridSwiper from '@/uni_modules/hr-grid-swiper/components/hr-grid-swiper/hr-grid-swiper.vue'
	import {
		Debounce
	} from '@/utils/debounce.js';
	import OpenADAdvertisement from '@/components/OpenADAdvertisement.vue'
	export default {
		components: {
			liuProgressbar,
			hrGridSwiper,
			OpenADAdvertisement
		},
		data() {
			return {
				userInfo: {
					userId: 'user123',
					firstName: 'Test',
					lastName: 'User',
					userName: 'testuser'
				},
				token: uni.getStorageSync('token'), //缓存token
				accountListShow: false, //抽奖券
				isOpen: false, //分享子按钮
				showCopy: false, //确认复制按钮
				titleCopy: '邀请好友，获得奖券', //提示标题
				content: '点击按钮，复制邀请链接分享给好友，获得更多奖券吧', //提示内容
				result: {}, //红包详情信息
				platforms: [{
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/iconD.png',
						name: 'telegram',
						color: '#0088cc'
					},
					{
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/iconE.png',
						name: 'copy',
						color: '#6B7280'
					}, {
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/iconA.png',
						name: 'twitter',
						color: '#1DA1F2'
					},
					{
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/iconB.png',
						name: 'facebook',
						color: '#4267B2'
					},
					{
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/iconC.png',
						name: 'whatsapp',
						color: '#25D366'
					},

				], //分享按钮
				show: false, //参与弹框
				userInfo: uni.getStorageSync('user'), //用户信息
				jqList: '', //奖券数组
				loading: true,
				zifangData: {}, //赞助方信息
				copyUrl: '', //复制链接
				allTime: 0, //后端返回总时间
				timeDiff: {
					hours: '00',
					minutes: '00',
					seconds: '00',
				}, //时分秒
				timer: null, // 定时器ID  
				timer2: null, // 轮询  
				formatTime: '', //倒计时描述
				showTab: 0, //切换当前数
				pollingInterval: 1000, // 默认轮询间隔 1秒
				totalAmount: 0, //奖池金额
				topList: [], //前10邀请者
				toplist1: {}, //第一名邀请者
				toplist2: {}, //第二名邀请者
				toplist3: {}, //第三名邀请者	
				lastlist1: {}, //最后一名邀请者
				lastlist2: {}, //最后二名邀请者
				lastlist3: {}, //最后三名邀请者
				gradient: '', //随机背景色
				show10: false, //前十弹框状态
				title: '', //标题
				gglist: [], //公共数组存排行数据
				chazhi: 0, //增加钱
				lastList: [], //最后数组
				luckyPerson: {}, //幸运获奖者
				code: '', //口令
				codeArr: [], //口令
				showTs: false, //提示弹框状态
				checkboxValue1: [], //默认提示框值
				// 基本案列数据
				checkboxList1: [{
					disabled: false
				}],
				donglist: [], //活动列表
				tishiSto: uni.getStorageSync('tishiSto'), //获取是否需要提示
				tishiSto2: false, //获取是否需要提示
				advertiserInfo: [], //广告信息
				debounce: new Debounce(), //状态锁
				detail: {}, //抽奖详情
				showJc: false, //口令步骤状态
				sdkLoaded: uni.getStorageSync('sdkLoaded'),
				form: {
					pageIndex: 1,
					pageSize: 10
				},
				jqListsum: 0,
				status: 'loadmore',
			};
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer2);
				clearInterval(this.timer);
				this.timer2 = null;
				this.timer = null;
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad(options) {
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.redirectTo({
						url: '/pages/index/index'
					})
				});
			}
		},
		onShow() {
			this.expireTime()
			// 用于获取奖券总数
			this.jqList = []
			queryLotteryCodeByTgId(this.form).then(res => {
				if (res.data && res.data.code === 0) {
					this.jqListsum = res.data.data.count
				}
			}).catch(errors => {
				this.$refs.uToast.error(errors.msg)
			});
			// 赞助商红包信息
			// getLotteryRedpackage().then(res => {
			// 	if (res.data && res.data.code === 0) {
			// 		this.zifangData = res.data.data
			// 		this.groupRedPacket()
			// 		this.urlCopy()
			// 	}
			// }).catch(errors => {
			// 	this.$refs.uToast.error(errors.msg)
			// });
			// 赞助方信息
			lotteryAdvertiserInfo().then(res => {
				if (res.data && res.data.code === 0) {
					this.advertiserInfo = res.data.data || []
				}
			}).catch(errors => {});
			// 红包缓存数据
			this.donglist = []
			const cachedData = localStorage.getItem('donglist');
			if (cachedData) {
				this.donglist = JSON.parse(cachedData);
			}
			this.hdList()
			document.body.style.overflow = 'auto';
		},
		mounted() {
			this.setRandomGradient();
		},
		methods: {
			// 点了广告里面的go
			adClick() {
				insertOpenAd().then(res => {}).catch(
					errors => {});
			},
			handleAdTaskFinished(e) {
				console.log('广告任务完成', e)
			},
			handleAdClosed(e) {
				console.log('广告播放完毕', e)
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

				const gradient = `linear-gradient(45deg, ${color1} 0%, ${color2} 33%, ${color3} 66%, ${color4} 100%)`;
				this.gradient = gradient;
			},
			// 更新时间并设置轮询间隔
			updateTime() {

				// 已过期
				if (this.allTime <= 0) {
					this.formatTime = this.i18n.gambling.tishi4;
					this.clearPolling();
					return;
				}
				this.expireTime2()
				// 根据剩余时间动态设置轮询间隔
				let newInterval;
				if (this.allTime <= 60) {
					newInterval = 1000; // 小于60秒，每秒轮询
				} else if (this.allTime <= 3540) {
					newInterval = 10000; // 小于3540秒，每10秒轮询
				} else {
					newInterval = 20000; // 大于3540秒，每20秒轮询
				}
				// 如果轮询间隔改变，重新设置定时器
				if (newInterval !== this.pollingInterval) {
					this.pollingInterval = newInterval;
					this.setPollingInterval();
				}
			},
			// 清除轮询
			clearPolling() {
				if (this.timer2) {
					clearInterval(this.timer2);
					this.timer2 = null;
				}
			},
			// 设置轮询间隔
			setPollingInterval() {
				this.clearPolling();
				this.timer2 = setInterval(() => {
					this.updateTime();
				}, this.pollingInterval);
			},
			// 开始轮询
			startPolling() {
				this.updateTime();
				this.setPollingInterval();
			},
			// 后端获取倒计时总时间
			expireTime() {
				queryLotteryCountdown().then(res => {
					if (res.data && res.data.code === 0) {
						this.allTime = res.data.data
						this.expireTime2()
						if (this.allTime == 0) {
							this.formatTime = this.i18n.gambling.tishi4;
							// this.clearPolling()
						} else {
							const futureDate = addSeconds(new Date(), res.data.data);
							this.startCountdown(format(futureDate, 'yyyy-MM-dd HH:mm:ss'))
							this.startPolling()
						}
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});
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
			// 参与活动事件
			hdSend(e) {
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
						url: '/pages/group_receive_redpacket/share_details?type=1&back=gambling'
					})
					return
				}
				if (this.deviceType == 'Mobile App') {
					uni.navigateTo({
						url: '/pages/group_receive_redpacket/share_details?type=1&back=gambling'
					})
					return
				}
				if (this.showStop) {
					this.showStop = false
					return
				}
				this.showStop = false
				uni.navigateTo({
					url: '/pages/group_receive_redpacket/share_details?type=1&back=gambling'
				})
			},
			// 开红包
			openGroupRedPacket(e) {
				// back 从哪来返回到哪标志
				if (e.conditionSize > 0) {
					// 从首页过来的
					uni.navigateTo({
						url: `/pages/group_receive_redpacket/share_condition?token=${this.token}&redpacketId=${e.redpacketId}&sort=0&tongji=0&activityId=${e.activityId}&back=gambling`
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
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=${receiveMoney}&sort=${sort}&activityId=${e.activityId}&back=gambling`
						})
					}).catch(errors => {
						this.$refs.uToast.error(errors.message, 3000)
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=0&sort=0&activityId=${e.activityId}&back=gambling`
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
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=${receiveMoney}&sort=${sort}&activityId=${e.activityId}&back=gambling`
						})
					}).catch(errors => {
						this.$refs.uToast.error(errors.message, 3000)
						uni.navigateTo({
							url: `/pages/group_receive_redpacket/share_details?redpacketId=${e.redpacketId}&receiveMoney=0&sort=0&activityId=${e.activityId}&back=gambling`
						})
					});
				}
			},
			// 0是总点击量，3统计邀请链接进入点击量
			statistic(e) {
				statisticsInterface(`redpacket_manage/statisticsInterface/${e}/0`).then(res => {}).catch(
					errors => {});
			},
			// 轮询目标
			expireTime2() {
				queryLotteryCountdown().then(res => {
					if (res.data && res.data.code === 0) {
						this.allTime = res.data.data
						if (this.allTime == 0) {
							this.formatTime = this.i18n.gambling.tishi4;
							this.clearPolling()
						}
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});
				lotteryShareInfo().then(res => {
					if (res.data && res.data.code === 0) {
						if (res.data.data == null) {
							this.topList = []
							this.lastList = []
							this.luckyPerson = []
							this.totalAmount = 0
							this.chazhi = 0
							return
						}
						this.detail = res.data.data
						this.topList = res.data.data.top10List
						this.lastList = res.data.data.lastSharePersonList
						this.luckyPerson = res.data.data.luckyPerson
						if (this.topList.length > 0) {
							this.toplist1 = this.topList[0]
						}
						if (this.topList.length > 1) {
							this.toplist2 = this.topList[1]
						}
						if (this.topList.length > 2) {
							this.toplist3 = this.topList[2]
						}
						if (this.lastList.length > 0) {
							this.lastlist1 = this.lastList[0]
						}
						if (this.lastList.length > 1) {
							this.lastlist2 = this.lastList[1]
						}
						if (this.lastList.length > 2) {
							this.lastlist3 = this.lastList[2]
						}
						var totalAmount = res.data.data.totalAmount
						var storAmount = uni.getStorageSync('totalAmount')
						clearInterval(this.timer);
						this.timer = null;
						const futureDate = addSeconds(new Date(), this.allTime);
						this.startCountdown(format(futureDate, 'yyyy-MM-dd HH:mm:ss'))
						// 奖池更新
						if (storAmount != totalAmount) {
							if (this.allTime == 0) {
								this.chazhi = 0
							} else {
								// 用缓存的金额和最新金额进行对比，如果不一致说明奖池更新
								this.chazhi = (Number(totalAmount) - Number(storAmount)).toFixed(3)
								setInterval(() => {
									this.chazhi = 0
								}, 4000)
							}
							this.totalAmount = res.data.data.totalAmount
							uni.setStorageSync('totalAmount', this.totalAmount)

						} else {
							this.totalAmount = res.data.data.totalAmount
							this.chazhi = 0
						}
					}
				}).catch(errors => {
					// this.$refs.uToast.error(errors.msg)
				});
			},
			// 免费参与
			// mianfei() {
			// 	this.debounce.use(() => {
			// 		uni.showLoading({})
			// 		getLotteryRedpackage().then(res => {
			// 			if (res.data && res.data.code === 0) {
			// 				uni.hideLoading()
			// 				console.log(res.data.data)
			// 				this.zifangData = res.data.data
			// 				this.groupRedPacket()
			// 				this.urlCopy()
			// 			}
			// 		}).catch(errors => {
			// 			this.$refs.uToast.error(errors.msg)
			// 			uni.hideLoading()
			// 		});
			// 		// 赞助方信息
			// 		lotteryAdvertiserInfo().then(res => {
			// 			if (res.data && res.data.code === 0) {
			// 				this.advertiserInfo = res.data.data || []
			// 				console.log(this.advertiserInfo, 'this.advertiserInfo')
			// 			}
			// 		}).catch(errors => {});

			// 	}, 500);
			// },
			// 口令红包步骤
			clickJc() {
				this.showJc = true
			},
			// 获取红包详情信息
			// groupRedPacket(e) {
			// 	getGroupRedPacket(`redpacket_manage/getGroupRedPacket/${this.zifangData.redpacketId}/0`).then(
			// 		res => {
			// 			if (res.data && res.data.code === 0) {
			// 				this.result = res.data.result
			// 				setTimeout(() => {
			// 					this.isOpen = true
			// 					console.log('111')
			// 				}, 1000);
			// 			}
			// 		}).catch(errors => {

			// 	});

			// 	// 口令红包
			// 	getActivityCodeTranslation(this.zifangData.activityId, this.zifangData.redpacketId).then(res => {
			// 		if (res.data && res.data.code === 0) {
			// 			console.log(res.data)
			// 			this.codeArr = res.data.result.split('')
			// 			this.code = res.data.result
			// 		}
			// 	}).catch(errors => {});
			// },
			// 关闭奖券列表弹框
			accountList_close() {
				this.accountListShow = false
				this.show10 = false
				document.body.style.overflow = 'auto';
				this.form = {
					pageIndex: 1,
					pageSize: 10
				}
			},
			onScrollToLower() {
				// 触底时的处理逻辑
				console.log('触底了')
				var sum = Math.ceil(this.jqListsum / 10);
				if (sum > this.form.pageIndex) {
					console.log('有下一页')
					this.status = 'loading';
					this.form.pageIndex++
					this.jiangquan()
				} else {
					console.log('没有下一页')
					this.status = 'nomore'
				}
			},
			// 关注平道
			pingdao() {
				window.location = 'https://t.me/packetgift_group'
			},
			// 奖券列表
			jiangquan() {
				queryLotteryCodeByTgId(this.form).then(res => {
					if (res.data && res.data.code === 0) {
						this.accountListShow = true
						document.body.style.overflow = 'hidden';
						this.jqList = [...this.jqList, ...res.data.data.lotteryCodeList]
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});
			},
			// 关闭参与弹框
			close() {
				this.show = false
				this.isOpen = false
				document.body.style.overflow = 'auto';
			},

			// 去分享
			toggleShare() {
				this.isOpen = !this.isOpen;
			},
			// 获取复制链接值
			async urlCopy(e) {
				console.log(e)
				var that = this
				const res = await redpCopyActivityLink(
					`redpacket_manage/copyActivityLink/${e.activityId}/${e.redpacketId}`)
				that.copyUrl = antwalletbotCopy() + '?startapp=' + res.data.redpacketId
				that.showCopy = true
				// that.copyText(that.copyUrl)
				that.statisticFx(e.activityId)
			},
			confirm() {
				var that = this
				uni.setClipboardData({
					data: that.copyUrl,
					success: function() {
						that.showCopy = false
						uni.showToast({
							title: that.i18n.page.text24,
							icon: 'none'
						});
					},
					fail: function(error) {

					}
				});
			},
			// 再次提示的勾选回调
			checkboxChange(n) {
				console.log('change', n);
				if (n.length == 0) {
					this.tishiSto2 = false
				} else {
					this.tishiSto2 = true
				}
			},
			// 内联分享
			neilian() {
				console.log(this.tishiSto2, '走了内联')
				if (this.tishiSto2) {
					uni.setStorageSync('tishiSto', true)
				} else {
					uni.setStorageSync('tishiSto', false)
				}
				this.tishiSto = uni.getStorageSync('tishiSto')
				let innerMode = this.zifangData.redpacketId + ":" + this.zifangData.activityId + ":" + this
					.userInfo.userId
				if (window.Telegram) {
					window.Telegram.WebApp.switchInlineQuery(innerMode, ["users",
						"groups"
					])
				}
			},
			// 2统计分享次数
			statisticFx(e) {
				statisticsInterface(`redpacket_manage/statisticsInterface/${e}/2`).then(res => {}).catch(
					errors => {});
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
								let innerMode = res.data.data.redpacketId + ":" + res.data.data
									.activityId + ":" + this.userInfo.userId
								if (window.Telegram) {
									window.Telegram.WebApp.switchInlineQuery(innerMode, [
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
			// 参与者弹框显示内容
			paiming(e) {
				this.show10 = true
				console.log(e)
				document.body.style.overflow = 'hidden';
				if (e == 'top') {
					this.gglist = this.topList
					this.title = this.i18n.gambling.top3
				} else if (e == 'lucky') {
					console.log(this.luckyPerson, 'this.luckyPerson')
					if (this.luckyPerson == null) {
						this.gglist = []
						this.title = this.i18n.gambling.top1
					} else {
						this.gglist = [this.luckyPerson]
						this.title = this.i18n.gambling.top1
					}
				} else {
					this.gglist = this.lastList
					console.log(this.lastList, 'this.lastList')
					this.title = this.i18n.gambling.name
				}
			},
			// 去分享动画
			getItemStyle(index) {
				const totalItems = this.platforms.length;
				// 120度扇形，转换为弧度
				const fanAngle = 120 * Math.PI / 180;
				// 起始角度（-60度，使扇形在正上方居中）
				const startAngle = -150 * Math.PI / 180;
				// 计算每个图标的角度
				const angle = startAngle + (fanAngle / (totalItems - 1)) * index;
				// 半径
				const radius = 200;

				return {
					transform: `translate(${Math.cos(angle) * radius}rpx, ${Math.sin(angle) * radius}rpx)`
				}
			},
			// tg分享
			share() {
				console.log('走了')
				if (this.tishiSto) {
					let innerMode = this.zifangData.redpacketId + ":" + this.zifangData.activityId + ":" + this
						.userInfo.userId
					if (window.Telegram) {
						window.Telegram.WebApp.switchInlineQuery(innerMode, ["users",
							"groups"
						])
					}
				} else {
					this.showTs = true
				}

			},
			// 格式化数字为两位数
			formatNumber(num) {
				return num < 10 ? '0' + num : num;
			},
			// 倒计时事件
			startCountdown(e) {
				const endTime = new Date(e).getTime();
				this.timer = setInterval(() => {
					const now = new Date().getTime();
					let remainingTime = endTime - now; // 计算剩余时间

					if (remainingTime <= 0) {
						clearInterval(this.timer); // 倒计时结束，清除定时器
						this.countdown = '00:00:00'; // 设置为00:00:00
					} else {
						// 转换时间
						let hours = Math.floor(remainingTime / (1000 * 60 * 60)); // 剩余总小时数
						let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // 分钟
						let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000); // 秒

						// 格式化时间为两位数
						hours = this.formatNumber(hours);
						minutes = this.formatNumber(minutes);
						seconds = this.formatNumber(seconds);

						this.countdown = `${hours}:${minutes}:${seconds}`;
						this.timeDiff.hours = hours
						this.timeDiff.minutes = minutes
						this.timeDiff.seconds = seconds
						// console.log(this.timeDiff.hours, this.timeDiff.minutes, this.timeDiff.seconds)
					}
				}, 1000); // 每秒更新一次
			},
			// 机器人或miniapp接口回调
			checkRedpacketVerifyCode(e) {
				openBotOrMiniapp({
					"type": e.conditionType,
					"nickname": e.botName,
					"tgId": this.userInfo.userTGID
				}).then(res => {

				}).catch(errors => {

				});
			},
			// go事件
			onClick_go: function(e) {
				console.log(e)
				this.show = false
				document.body.style.overflow = 'auto';
				if (e.conditionType == '5') {
					// 推特
					// const url = 'https://x.com/intent/follow?screen_name=' + e.botName
					// const url = 'https://x.com/intent/' + e.botName

					const url = e.advertiserLink
					// 最推荐的方法
					Telegram.WebApp.openLink(url, {
						try_instant_view: false // 禁用即时视图，强制在外部浏览器打开
					});
					setTimeout(() => {
						this.checkRedpacketVerifyCode(e)
					}, 500);
					return
				}
				// ?botName=PacketGiftBot
				Telegram.WebApp.openTelegramLink(e.advertiserLink); //跳转频道或者群租或者bot或者miniapp
				// if (e.conditionType == '1') {
				// 	setTimeout(() => {
				// 		// 群组
				// 		insertGroup(e.botName).then(res => {}).catch(errors => {});
				// 	}, 1000);
				// 	return
				// }
				// if (e.conditionType == '2') {
				// 	setTimeout(() => {
				// 		// 频道
				// 		insertChannel(e.botName).then(res => {}).catch(errors => {});
				// 	}, 1000);
				// 	return
				// }
				if (e.callback != 1) {
					// 我跟你才是真玩
					console.log('真')
					// 设置定时器，在1秒后执行请求
					if (e.conditionType == '3' || e.conditionType == '4') {
						setTimeout(() => {
							this.checkRedpacketVerifyCode(e)
						}, 500);
					}
				}
			},
			// 复制链接
			copyText(e) {
				// 不支持复制数字类型所以需要先转为字符串
				var that = this
				uni.setClipboardData({
					data: e,
					success: function() {
						uni.showToast({
							title: that.i18n.page.text24,
							icon: 'none'
						});
					},
					fail: function(error) {

					}
				});
			},
			// 复制口令
			codeKl(e) {
				var that = this
				uni.setClipboardData({
					data: e,
					success: function() {
						uni.showToast({
							title: that.i18n.gambling.buzou.tishi,
							icon: 'none'
						});
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-repeat: no-repeat;
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/cjbg.png');
		background-size: cover;
	}

	.copy {
		font-size: 26rpx;
		text-align: center;
		margin-top: 20rpx;
		text-decoration: underline;
		color: blue;
		cursor: pointer;
	}


	.u-popup-slot {
		width: 90%;
		height: 100%;
		align-self: center;
		font-size: 24rpx;

		.liaojie {
			width: 200rpx;
			background-color: #ff505d;
			color: #fff;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			text-align: center;
			margin: 0 auto;
			border-radius: 10rpx;
		}

		.gouxuan {
			margin: 20rpx 0;
		}

		.tishitu {
			width: 100%;
			height: 550rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.zhongjiang {
			font-size: 40rpx;
			font-weight: 600;
			text-align: center;
			padding: 50rpx;
			box-sizing: border-box;
		}

		.zhucheng {
			width: 100%;
			margin: 20rpx auto;
			font-weight: 800;
			font-size: 24rpx;
			color: #666666;
			margin-top: 100rpx;

			text {
				font-weight: 800;
				font-size: 26rpx;
				color: #8E8E8E;
			}
		}

		.accountlist_group_2 {
			background-color: rgba(255, 255, 255, 1);
			border-radius: 30rpx;
			padding: 30rpx 30rpx 20rpx 30rpx;
			box-sizing: border-box;




			.yindao {
				padding-top: 30rpx;
				font-weight: bold;
				color: #333333;
				font-size: 26rpx;
				text-align: center;
			}

			.accountlist_text {
				overflow-wrap: break-word;
				color: rgba(51, 51, 51, 1);
				font-size: 36rpx;
				font-family: PingFangSC-Medium;
				font-weight: 700;
				text-align: center;
				white-space: nowrap;
				line-height: 25px;
				margin-top: 9px;
			}
		}
	}

	.btnbox {
		width: 100%;
		padding: 24rpx 18rpx 0rpx;
		box-sizing: border-box;

		.btnmax {
			background-color: #FF505DFF;
			font-size: 32rpx;
			color: #FFFFFF;
			width: 47%;
			margin: 0 auto;
			padding: 32rpx 0;
			text-align: center;
			border-radius: 20rpx;
			cursor: pointer;
			border: 1px solid #FF505DFF;
		}

		.btnmax1 {
			background-color: #fff;
			font-weight: 500;
			font-size: 32rpx;
			color: #010101;
			width: 47%;
			margin: 0 auto;
			padding: 32rpx 0;
			text-align: center;
			border-radius: 20rpx;
			border: 1px solid #303030FF;
			cursor: pointer;
		}
	}


	.red-packet-item {

		.hdson {
			width: 400rpx;
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
				height: 464rpx;
				// background-image: url('../../static/images/gifebg.png');
				// background-size: 100% 100%;
				z-index: 10;
				position: relative;

				.yinying {
					transition-duration: 350ms;
					transition-timing-function: ease-out;
					position: absolute;
					inset: 0px;
					width: 100%;
					height: 100%;
					z-index: 100;
					background-color: rgba(0, 0, 0, 0.5);
					border-radius: 40rpx;
				}

				.verticalCover {
					border-top-right-radius: 40rpx;
					border-top-left-radius: 40rpx;
					border-bottom-left-radius: 10%;
					border-bottom-right-radius: 10%;
				}

				image {
					width: 100%;
					height: 360rpx;
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
					width: 180rpx;
					height: 80rpx;
					left: 0;
					right: 0;
					bottom: 90rpx;
					margin: auto;
					z-index: 110;
					border-radius: 50rpx;
					font-weight: 600;
					color: #573902;
					background: linear-gradient(180deg, #fbdc9c, #f2ba4b);
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

	/deep/.u-cell__title {
		width: 400rpx !important;
	}

	/deep/.u-cell__title-text {
		overflow: hidden !important;
		white-space: nowrap !important;
		text-overflow: ellipsis !important;
	}

	.tankuang {
		padding: 30rpx 0;
		box-sizing: border-box;
		// background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/buzoubg.png');
		// background-size: 100% 100%;

		.follow {
			font-size: 24rpx;
			color: #FFFFFF;
			text-align: center;
			margin: 16rpx 0;
		}

		.guanggao {
			width: 100%;
			margin: 0 auto;
			background: #fff;
			background-size: cover;
			border-radius: 20rpx;
			padding: 29rpx 20rpx;
			box-sizing: border-box;
			box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.11);

			.chakan {
				background: linear-gradient(180deg, #F5DCA2 0%, #E9BB5E 100%);
				color: #593300;
				border-radius: 40rpx;
				padding: 14rpx 30rpx;
				box-sizing: border-box;
				font-weight: 600;
			}

			.chakan2 {
				background: #E7E7E7;
				color: #ABABAB;
				border-radius: 40rpx;
				padding: 14rpx 30rpx;
				box-sizing: border-box;
				font-weight: 600;
				font-size: 28rpx;
			}

			.xinxi {
				width: 330rpx;
				text-align: left;
				margin-left: 24rpx;
				font-size: 24rpx;

				.name {
					font-weight: bold;
					font-size: 24rpx;
					color: #333333;
					margin-bottom: 25rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.miaoshu {
					font-size: 28rpx;
					color: #333333;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.zzftx {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;

			}
		}

		.fsname {
			width: 147rpx;
			font-size: 28rpx;
			height: 49rpx;
			color: #DA463E;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/62d707dc-319c-4356-8c4d-01267443de88.png');
			background-size: 100% 100%;
			text-align: center;
			line-height: 49rpx;
			margin: 38rpx 0 32rpx 47rpx;
		}

		.fsname2 {
			width: 147rpx;
			font-size: 28rpx;
			font-size: 28rpx;
			color: #8F28B7;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/62d707dc-319c-4356-8c4d-01267443de88.png');
			background-size: 100% 100%;
			text-align: center;
			line-height: 49rpx;
			margin: 64rpx 0 32rpx 47rpx;
		}

		.litizi {
			text-align: center;

			.glowing-text {
				color: #ffffff;
				/* 主文字颜色为白色 */
				font-size: 42rpx;
				font-family: GenSenRounded2 TW, GenSenRounded2 TW;
				/* 调整字体大小 */
				font-weight: bold;
				line-height: 59rpx;
				text-shadow:
					2px 2px 0 #ff0000,
					/* 红色描边 */
					-2px 2px 0 #ff0000,
					2px -2px 0 #ff0000,
					-2px -2px 0 #ff0000,
					0px 2px 0 #ff0000,
					0px -2px 0 #ff0000,
					2px 0px 0 #ff0000,
					-2px 0px 0 #ff0000,
					3px 3px 5px rgba(0, 0, 0, 0.5);
				/* 添加阴影效果 */
				font-style: normal;
				text-transform: none;
			}

			.yellow-text {
				color: #FFE15A;
				/* 黄色文字 */
			}

			.yellow-text2 {
				color: #FFDE91;
				/* 黄色文字 */
			}

		}

		.buzou {
			width: 85%;
			margin: 16rpx auto;

			.bzson {
				width: 190rpx;
				background-color: #ffffff1a;
				border-radius: 19.5rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 29rpx;
				padding: 8rpx;
				box-sizing: border-box;
				text-align: center;
			}

			image {
				width: 18rpx;
				height: 18rpx;
			}
		}

		.klcode {
			background-color: #ff505d1a;
			width: 95%;
			margin: 0 auto;
			border-radius: 105rpx;
			text-align: center;
			position: relative;
			padding: 22rpx 0 25rpx;

			.code {
				font-size: 28rpx;
				color: #000000;
				letter-spacing: 11px;
			}

			.fuzhi {
				position: absolute;
				top: 20rpx;
				right: 32rpx;

				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}

		.baidi {
			border-radius: 36rpx;
			padding: 20rpx 18rpx;
			box-sizing: border-box;
			background-color: #fff;
			width: 95%;
			margin: 0 auto;
		}

		.koulin {
			font-size: 32rpx;
			color: #FF505D;
			text-align: center;
			margin: 0rpx 0 25rpx;
			font-weight: 600;
			position: relative;
			z-index: 2;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-left: 12rpx;
			}
		}


		.btns {
			width: 95%;
			margin: 0 auto;
			padding: 32rpx 21rpx 44rpx;
			box-sizing: border-box;

			.son {
				width: 100rpx;
				text-align: center;

				image {
					width: 100rpx;
					height: 100rpx;
					margin-bottom: 8rpx;
				}

				.sonname {
					font-size: 24rpx;
					color: #000000;
				}
			}
		}


		.title {
			margin: 36rpx 0 26rpx;
			font-family: Source Han Sans CN, Source Han Sans CN;
			font-weight: 400;
			font-size: 24rpx;
			color: #999999;
			text-align: center;
		}
	}

	.containe {
		position: relative;
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

	.gambling {
		position: relative;

		.lotterylogo {
			width: 327rpx;
			height: 54rpx;
			margin: 40rpx 0 10rpx 46rpx;
		}

		.group {
			width: 529rpx;
			height: 81rpx;
			margin: 0rpx 0 0rpx 81rpx;
		}

		.cjdel {
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			top: 58rpx;
			right: 46rpx;
			cursor: pointer;
			z-index: 10;
		}

		.jiangchi {
			width: 100%;

			.containerRight {
				margin-left: 32rpx;

				.add {
					image {
						width: 20rpx;
						height: 28rpx;
						margin-right: 12rpx;
					}

					font-family: PingFang SC,
					PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #FFFFFF;
				}

				.jcdw {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #FFFFFF;
				}
			}
		}

		.djs {
			width: 571rpx;
			margin: 0 auto;
			color: #FFFFFF;
			margin-bottom: 8rpx;


			.titles {
				font-size: 24rpx;
				padding: 0 55rpx 24rpx 55rpx;
				box-sizing: border-box;
			}

			.time {
				padding: 18rpx 55rpx;
				border-top: 1px solid #fff;
				border-bottom: 1px solid #fff;
				font-size: 48rpx;
				font-weight: 600;
			}

			.time2 {
				padding: 18rpx 0rpx;
				border-top: 1px solid #fff;
				border-bottom: 1px solid #fff;
				font-size: 48rpx;
				font-weight: 600;
			}
		}

		.jieti {
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/paiming.png');
			background-position: bottom;
			background-size: 100% 310rpx;
			background-repeat: no-repeat;
			width: 726rpx;
			margin: 0 auto;
			position: relative;
			padding-bottom: 48rpx;

			.jieson {
				text-align: center;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 24rpx;
				color: #FFFFFF;
				position: relative;
				box-sizing: border-box;
				width: 220rpx;

				.title {
					font-size: 24rpx;
					color: #FFFFFF;
					background: linear-gradient(94deg, #FF4A00 0%, #FF4B01 100%);
					border-radius: 28rpx 28rpx 28rpx 28rpx;
					padding: 10rpx;
					box-sizing: border-box;
					margin-bottom: 40rpx;
					position: relative;
					z-index: 3;
				}

				.tishi {
					font-size: 24rpx;
					color: #fff;

					.baifen {
						background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/d1fa57ee-9f06-4a45-b733-3b0ddb4705e3.png');
						background-size: 100% 100%;
						background-repeat: no-repeat;
						color: #FF9200;
						margin-left: 8rpx;
						padding: 6rpx 12rpx;
						box-sizing: border-box;
					}
				}

				.jiangli {
					font-size: 36rpx;
					font-weight: bold;
					background: linear-gradient(180deg, #FFF2CA 0%, #FFAB00 100%);
					-webkit-background-clip: text;
					color: transparent;
					font-style: normal;
					font-family: AlibabaPuHuiTi_3_115_Black;
					margin-top: 10rpx;

					image {
						width: 46rpx;
						height: 46rpx;
					}
				}

				.yi {
					width: 88rpx;
					height: 116rpx;
				}

				.diyi {
					height: 150rpx;
					position: relative;
					margin: 0 auto;
					z-index: 2;
					top: 20rpx;
					cursor: pointer;

					.diyison {
						width: 220rpx;
						height: 220rpx;
						background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/diyi.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 0rpx;
						right: 0;
						bottom: 0rpx;
						top: 30rpx;
						margin: auto;
						z-index: 2;

						.tx1 {
							width: 110rpx;
							height: 110rpx;
							border-radius: 50%;
							position: absolute;
							left: 0rpx;
							right: 4rpx;
							bottom: 8rpx;
							top: 0;
							margin: auto;
							z-index: 2;
							font-size: 40rpx;
						}
					}
				}

				.er {
					width: 106rpx;
					height: 106rpx;
					position: relative;
					margin: 0 auto;
					z-index: 2;
					top: 20rpx;

					.er2 {
						width: 106rpx;
						height: 106rpx;
						background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/er.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 0rpx;
						right: 0;
						bottom: 0rpx;
						top: 0;
						margin: auto;
						z-index: 2;

						// .avatar {
						// 	display: inline-flex;
						// 	justify-content: center;
						// 	align-items: center;
						// 	color: #fff;
						// 	font-weight: 700;
						// 	background-color: #fff;
						// 	width: 64rpx;
						// 	height: 64rpx;
						// 	margin-right: 20rpx;
						// 	border-radius: 50%;
						// }

						.tx1 {
							width: 90rpx;
							height: 90rpx;
							border-radius: 50%;
							position: absolute;
							left: 0rpx;
							right: 0;
							bottom: 0rpx;
							top: 0;
							margin: auto;
							z-index: 2;
							font-size: 40rpx;
						}

					}


					.tx11 {
						position: absolute;
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						left: -90rpx;
						right: 0;
						bottom: 0rpx;
						top: 20rpx;
						margin: auto;
						z-index: 1;
						opacity: 0.5;
					}

					.tx12 {
						position: absolute;
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						left: 0rpx;
						right: -90rpx;
						bottom: 0rpx;
						top: 20rpx;
						margin: auto;
						z-index: 1;
						opacity: 0.5;
					}
				}

				.san {
					width: 74rpx;
					height: 98rpx;
					background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/san.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					position: relative;
					margin: 0 auto;

					.tx3 {
						position: absolute;
						width: 100%;
						height: 72rpx;
						border-radius: 50%;
						left: 0rpx;
						right: 0;
						bottom: 0rpx;
						margin: auto;
					}
				}



				.tx2 {
					position: absolute;
					width: 82rpx;
					height: 82rpx;
					border-radius: 50%;
					left: 0rpx;
					right: 0;
					top: 32rpx;
					margin: auto;
				}


			}

		}

		.btn {
			width: 660rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 36rpx;
			color: #593300;
			font-style: normal;
			padding: 28rpx 0;

			border-radius: 60rpx;
			text-align: center;
			margin: 20rpx auto 0;
			cursor: pointer;
		}
	}

	// 菜单
	.caidan {
		width: 600rpx;
		margin: 30rpx auto 0rpx;
		color: #4B0004;
		font-size: 28rpx;

		.cdson {
			cursor: pointer;
		}

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 16rpx;
		}

		.xian {
			background-color: #4B0004;
			width: 1px;
			height: 34rpx;
		}
	}

	/* 注意：实际使用时需要引入对应的字体图标文件 */
	@font-face {
		font-family: 'share-icon';
		src: url('/static/fonts/share-icon.ttf') format('truetype');
	}

	.share-wrapper {
		position: absolute;
		width: 300rpx;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 160rpx;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	// .share-toggle {
	// 	position: absolute;
	// 	z-index: 10;
	// 	width: 80rpx;
	// 	height: 80rpx;
	// 	background: #2196f3;
	// 	border-radius: 50%;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	transition: transform 0.3s ease;
	// }

	// .share-toggle.active {
	// 	transform: scale(1.1);
	// }

	.share-icon {
		font-family: 'share-icon';
		font-size: 40rpx;
		color: #fff;
	}

	.share-item {
		position: absolute;
		z-index: 120;
		width: 80rpx;
		height: 80rpx;
		// background: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		transform: translate(0, 0) scale(0);
		transition: all 0.3s ease;
		opacity: 0;

		.share-icon {
			width: 100% !important;
			height: 100% !important;
		}
	}

	.share-item.show {
		transform: scale(1);
		opacity: 1;
	}

	/* 为每个按钮添加不同的动画延迟，创造连续展开效果 */
	.share-item:nth-child(2) {
		transition-delay: 0s;
	}

	.share-item:nth-child(3) {
		transition-delay: 0.05s;
	}

	.share-item:nth-child(4) {
		transition-delay: 0.1s;
	}

	.share-item:nth-child(5) {
		transition-delay: 0.15s;
	}

	.share-item:nth-child(6) {
		transition-delay: 0.2s;
	}

	.copy-toast {
		position: absolute;
		bottom: 20rpx;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		padding: 10rpx 30rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		animation: fadeInOut 2s ease;
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}

		20% {
			opacity: 1;
		}

		80% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	/* 适配暗黑模式 */
	@media (prefers-color-scheme: dark) {
		.share-item {
			background: #333;
			box-shadow: 0 2rpx 8rpx rgba(255, 255, 255, 0.1);
		}
	}

	// tab栏
	.user_list {
		.tabs {
			width: 100%;
			padding: 60rpx 0 46rpx;
			position: relative;
			border-top: 1px solid #ffffff1a;

			.wenhao {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				top: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}

			.tabson {
				width: 40%;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #fff;

				image {
					width: 26rpx;
					height: 28rpx;
					margin-right: 8rpx;
				}
			}

			.showthis {
				color: #fff;
				position: relative;
			}

			.showthis::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -16rpx;
				right: 0;
				margin: auto;
				width: 40rpx;
				/* 根据需要调整 */
				height: 14rpx;
				/* 下划线的高度 */
				background-repeat: no-repeat;
				background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/cjtab.png');
				background-size: 100% 100%;
				/* 渐变效果 */
				/* 其他装饰效果，如阴影等 */
			}
		}

		.zwhb {
			text-align: center;
			font-size: 30rpx;
			color: #E5E5E5;

			image {
				width: 300rpx;
				height: 300rpx;
				margin-bottom: 20rpx;
			}
		}

		/deep/.u-tag {
			transform: skewX(-10deg);
			border-radius: 12rpx;
		}

		.list_title {
			font-weight: 550;
			font-size: 32rpx;
			color: #333333;
			line-height: 48rpx;
			width: 400rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-family: PingFangSC, PingFang SC;

			.paiming {
				font-size: 24rpx;
				color: #F05A49;
				background-color: #FFEFEE;
				border-radius: 6rpx;
				padding: 0 8rpx;
				box-sizing: border-box;
				margin-left: 10rpx;
				font-family: PingFangSC, PingFang SC;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;

				}
			}
		}

		/deep/.u-cell__body__content {
			width: 20rpx !important;
		}

		.list_label {
			font-weight: 400;
			font-size: 24rpx;
			color: #8E8E8E;
			line-height: 40rpx;
		}

		.list_value {
			font-weight: 600;
			font-size: 32rpx;
			color: #333333;
			text-align: right;

			.renshu {
				margin-top: 12rpx;
				font-size: 24rpx;
				color: #8E8E8E;
			}
		}
	}

	// 活动规则
	.tab_list {
		padding: 0 20rpx 36rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		width: 726rpx;
		margin: 16rpx auto;
		border-radius: 20rpx;

		.rwlist {
			background-color: #fff;
			padding: 0 25.6rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
			// position: relative;
			// z-index: 110;

			.son {
				padding: 20rpx 0;
				border-top: 1px solid #d6d7d9;

				.son_left {
					width: 65%;

					.avatar {
						width: 120rpx;
						height: 120rpx;
						margin-right: 20rpx;
						border-radius: 20rpx;
					}

					.xinxi {
						width: 75%;

						.titlehd {
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
							.shine-wrapper {
								image {
									width: 40rpx;
									height: 40rpx;
									margin-right: 10rpx;
								}
							}

							.shine-wrapper2 {
								image {
									width: 42rpx;
									height: 34rpx;
									margin-left: 10rpx;
								}
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
						width: 44rpx;
						height: 40rpx;
						margin-left: 5rpx;
					}
				}
			}

			.son:first-child {
				border: none;
			}
		}

		.panding {
			background-color: #F6F2F3;
			border-radius: 12rpx;
			padding: 13rpx 10rpx;
			box-sizing: border-box;
			margin-top: 8rpx;

			.suanshu {
				margin-top: 13rpx;
				font-size: 22rpx;
				color: #4B0004;

				.jieguo2 {
					width: 140rpx;
					text-align: center;

					image {
						height: 40rpx;
					}
				}

				.jieguo {
					background-color: #FF505D33;
					padding: 2rpx 5rpx;
					box-sizing: border-box;
					color: #FF505DFF;
				}

				image {
					margin-left: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}

			.name {
				font-size: 24rpx;

				text {
					color: #D04F47;
					margin-right: 8rpx;
				}
			}
		}

		.titlemax {
			width: 490.5rpx;
			padding: 17rpx 0;
			margin: 0 auto;
			background-repeat: no-repeat;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/title.png');
			background-size: 100% 100%;
			font-size: 36rpx;
			color: #FFFFFF;
			text-align: center;
		}

		.txt {
			font-size: 26rpx;
			color: #4B0004;
			line-height: 31rpx;
		}

		.title {
			font-weight: bold;
			font-size: 28rpx;
			color: #D31E37;
			font-style: normal;
			height: 48rpx;
			text-align: center;
			line-height: 48rpx;
			background: linear-gradient(180deg, #F5DCA1 0%, #FFE8B1 100%);
			border-radius: 200rpx 200rpx 0rpx 200rpx;
			margin: 36rpx 0 16rpx;
			display: inline-block;
			/* 使背景随内容自适应 */
			padding: 0 30rpx;
			box-sizing: border-box;
		}
	}
</style>