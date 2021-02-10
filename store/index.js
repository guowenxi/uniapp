import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		baseUrl:"http://25258q45p8.qicp.vip:56297/",
		_fieldName:"",
	},
	mutations: {
		saveData(state, { payload }) {
			Object.assign(state, {...payload})
		},
	},
	actions: {

	}
})

export default store
