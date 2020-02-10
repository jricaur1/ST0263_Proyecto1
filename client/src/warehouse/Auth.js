 import axios from 'axios';
// import router from '../router';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: ''
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};

const actions = {
//Login action
async login({commit}, user){
    commit('auth_request');
    let res = await axios.post('http://localhost:5000/api/users/login', user);
    if(res.data.success){
        const token = res.data.token;
        const user = res.data.user;
        // Set the token into the localStorage
        localStorage.setItem('token', token);
        // Set the axios defaults
        axios.defaults.headers.common['Autorization'] = token;
        commit('auth_success', token, user);
    }
    return res;
}
};

const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token
        state.user = user
        state.status = 'success'
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};