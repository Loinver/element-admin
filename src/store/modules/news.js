import data2 from '../../data/index'


const state = {
    list:[]
};


const actions = {
    getNews ({commit}) {
        data2.getnews(function(res){
            commit('GETNEWS',{res})
        })
    }
};

const mutations = {
    GETNEWS(state,{res}){
        state.list = res
    }
}

export default {
    state,
    actions,
    mutations
}