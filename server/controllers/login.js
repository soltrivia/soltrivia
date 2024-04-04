
module.exports = async (ctx, next) => {

    if (ctx.state.$wxInfo.loginState) {
        ctx.state.data = ctx.state.$wxInfo.userinfo
    }
}
