module.exports = {
  'GET /user': { name: '测试mock数据' },
  'POST /login/account': (req, res) => {
    const { password, username } = req.body
    if (password === 'system' && username === 'admin') {
      return res.send({
        status: 'ok',
        code: '000000',
        token: 'sdfsdfsdfdsf',
        data: { id: 0, name: '超级管理员' }
      })
    } else {
      return res.send({ status: 'error', code: 403 })
    }
  }
}
