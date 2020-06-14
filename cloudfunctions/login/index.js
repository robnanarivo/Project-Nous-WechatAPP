// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const studentApp = db.collection("studentApp");
  const adminList = db.collection("adminList");

  let hasApplied = false, isAdmin = false;
  
  let app = await studentApp.where({
    _openid: wxContext.OPENID,
  }).get();
  if (app.data.length !== 0) {
    hasApplied = true;
  }

  let admin = await adminList.doc("b06604d45ee4fafc000ae4fd4bf24308").get();
  console.log(admin)
  for (let adminId of admin.data.adminOpenId) {
    if (wxContext.OPENID === adminId) {
      isAdmin = true;
    }
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
    hasApplied,
    isAdmin,
  }
}

