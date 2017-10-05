module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = ctx.status || 400;
    if (err.message) {
      ctx.body = {errors:[err.message]};
    }
    //eslint-disable-next-line
    console.error(err);
  }
};
