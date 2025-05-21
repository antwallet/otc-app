export default {
  namespaced: true,
  state: {
    userTGID: '',
    firstName: '',
    userName: '',
    avatar: '',
	token:''
  },
  mutations: {
    updateUserTGID (state, tgid) {
      state.userTGID = tgid
    },
    updateFirstName (state, firstName) {
      state.firstName = firstName
    },
    updateUserName (state, userName) {
      state.userName = userName
    },
    updateAvatar (state, avatar) {
      state.avatar = avatar
    },
    updateRedpacketCover (state, redpacketCover) {
      state.avatar = redpacketCover
    },
	tokenFun (state, token) {
	  state.token = token
	},
  }
}
