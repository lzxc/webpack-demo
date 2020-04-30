import Api from '@/assets/js/apiClient'

export function getUser(data) {
    return Api.request({ url: '/api/user', type: 'get', data })
}

export function loginAccount(data) {
    return Api.request({
        url: '/login/account', type: 'post', data, config: {
            headers: { 'x-token': 'test-token' },
        }
    })
}