

const CONF = {
  port: '5757',
  rootPathname: '',
  appId: '',
  appSecret: '',
  useQcloudLogin: true,
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: '123456',
    char: 'utf8mb4'
  },
  cos: {
    region: 'ap-guangzhou',
    fileBucket: 'wximg',
    uploadFolder: ''
  },
  wxLoginExpires: 7200
}
module.exports = CONF;
// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
